import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

// Record completed output only. This script never edits the AE project or inputs.
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, data) => fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
const file = p => ({path:path.resolve(p).replaceAll('\\','/'),bytes:fs.statSync(p).size,sha256:createHash('sha256').update(fs.readFileSync(p)).digest('hex')});
const measured = read('qa/technical-verification-preflight.json');
const native = read('qa/final-native-project.json');
const master = native.items.find(i => i.id === 1);
const phoneScreen = native.items.find(i => i.id === 91);
const phoneVideo = phoneScreen.layers.find(l => l.id === 129);
const inputs = read('../source-manifest.json').assets.map(a => ({id:a.id,path:a.path,expected_bytes:a.bytes,expected_sha256:a.sha256,...file(a.path)}));
for (const input of inputs) input.unchanged = input.bytes === input.expected_bytes && input.sha256 === input.expected_sha256.toLowerCase();
if (!inputs.every(i => i.unchanged)) throw new Error('An input changed. Do not report completion.');
const probe = JSON.parse(execFileSync('ffprobe.exe',['-v','error','-count_frames','-show_streams','-show_format','-of','json','TITAN-Review-v002.mp4'],{encoding:'utf8'}));
execFileSync('ffmpeg.exe',['-v','error','-nostdin','-i','TITAN-Review-v002.mp4','-f','null','-'],{stdio:['ignore','pipe','pipe']});
const v = probe.streams.find(s => s.codec_type === 'video');
const mediaPassed = v.width === 2400 && v.height === 1024 && v.r_frame_rate === '30/1' && Number(v.nb_read_frames) === 315 && Number(probe.format.duration) === 10.5 && probe.streams.filter(s => s.codec_type === 'audio').length === 0;
if (!mediaPassed) throw new Error('Output media contract failed.');
write('qa/final-media-probe.json',probe);
const playback = {
  method:'Local HTML video player, normal-speed replay button, start-to-ended without seek or rate adjustment',
  url:'http://127.0.0.1:49246/',observed_times_seconds:[0.001,3.990,8.778,10.500],
  ended:true,paused_at_end:true,playback_rate:1,duration_seconds:10.5,current_time_at_end:10.5,
  video_width:2400,video_height:1024,media_error:null,
  visual_review:'Boundary contact sheets and native frames also inspected; this is not user aesthetic approval.'
};
write('qa/playback-verification.json',playback);
const timing = {
  frame_convention:'Zero-based master absolute frames; ranges are end-exclusive unless named exact samples. All scene/container startTime values are 0.',
  master:{name:master.name,width:master.width,height:master.height,fps:master.frameRate,duration_seconds:master.duration,frames:600,work_area:[0,10.5]},
  existing_markers:master.markers,
  numbering:'06 Sportsbook, 07 Operations/refined, 08 Sudden odds shift and auto-blocking; the existing F279 09 result marker is preserved, not renumbered.',
  segments:[{name:'Existing through CAT VILLAGE',start:0,end:171},{name:'06 Sportsbook',start:171,end:228},{name:'07 Operations/refined',start:228,end:258},{name:'08 Sudden odds shift and Bets auto-blocked',start:258,end:315},{name:'Not built in this task',start:315,end:600}],
  durations:{added_frames:144,added_seconds:4.8,review_frames:315,review_seconds:10.5,not_built_frames:285,not_built_seconds:9.5},
  cat_to_06:{tail_curve:[164,170],scroll:[171,180],tail_center:[2040,830],tail_radius:80,scroll_y:[0,-1024],curve_endpoint_screen:[2240,856],progress:'q = 6u^5 - 15u^4 + 10u^3, u = clamp((F-171)/9,0,1)',old_path_expression_before_f164_preserved:true,old_cat_last_visible_frame:180},
  phone:{model_comp:'DEVICE_iPhone17_3D',screen_comp:'SCREEN_iPhone17_VIDEO_CONTAIN',material:'iPhone17.SCREEN',mapping_completed_by:'user, then verified by renders before and after save/reopen',screen_pixels:[1206,2622],source_pixels:[332,720],source_fps:24,scale_percent:1206/332*100,contain_padding_y:(2622-720*1206/332)/2,source_time_rule:'1 + (F-171)/30 seconds',actual_video_start_time:phoneVideo.startTime,actual_source_times:[171,182,219,227].map(f=>({master_frame:f,source_seconds:f/30-phoneVideo.startTime})),audio_enabled:false,model_transform:{orientation:[90,0,0],position:[682,512,0],uniform_scale_percent:1165},hold:[182,220],red_dot_mask:{scope:'SCREEN_iPhone17_VIDEO_CONTAIN only; source MP4 unchanged',layer:'RECORDING_RED_DOT_MASK',center:[385,94],radius:26,feather:2,user_requested:true}},
  scene07:{ribbon_stretch:[220,222],charcoal_cover:[222,228],planes_align:[222,234],operations:[228,232],refined:[230,234],read_hold:[234,250],outline_motion:[228,252],outline_upper_px_per_frame:-24,outline_lower_px_per_frame:18,outline_repeat_period:'Measured sourceRect width + 80px',container_during_overlay:{position:[1200,512,0],scale:[100,100,100],fixed:true}},
  whole_overlay:{comp:'SCENE08_WHOLE_OVERLAY_180DEG',layer:'S08_ALL_CONTENT_NATIVE_ZOOM',source_comp:'SCENE08_SHIFT_NATIVE',all_background_rails_masks_text_together:true,fade:[250,252],zoom:[252,260],settle:[260,262],anchor:[210,251,0],initial_position:[1200,512,0],arrival_position:[210,251,0],scale_percent:[600,100],progress:'q = 6u^5 - 15u^4 + 10u^3, u = clamp((F-252)/8,0,1)',position_rule:'[1200 - 990*q, 512 - 261*q]',initial_cell_bounds:[0,101,420,300],initial_cell_color:'ivory',initial_scaled_cell_size:[2520,1800],anchor_recalculation_reason:'Allowed by the brief: reverse-phased native rail cell center is y251 rather than initial guide y205; anchor and arrival position are identical.',collapse_transformations:true,shutter_angle:180,shutter_phase:0,motion_blur_samples_per_frame:64,motion_blur_adaptive_sample_limit:256},
  scene08:{condition_words:[{text:'Sudden',reveal:[261,265]},{text:'odds',reveal:[262,266]},{text:'shift',reveal:[263,267]}],rail_speeds:[{range:[262,267],pixels_per_frame:14},{range:[267,273],pixels_per_frame:36},{range:[273,279],pixels_per_frame:60}],travel_pixels:5*14+6*36+6*60,left_direction:'up',right_direction:'down',left_initial_y:646,right_initial_y:-646,stop_frame:279,stop_y:0,cell_height:300,color_period:900,right_phase_offset_cells:1,bets:[279,284],bets_scale_percent:[118,100],bets_y_offset:[60,0],auto_blocked:[281,287],result_hold:[287,315],result_hold_frames:28},
  comp_structure:native.items.filter(i => i.layers).map(i=>({id:i.id,name:i.name,fps:i.frameRate,duration:i.duration,layer_count:i.layers.length})),
  evaluated_property_samples:'qa/native-property-samples.json'
};
write('actual-timeline.json',timing);
const verification = {
  checked_at:new Date().toISOString(),production:'completed',technical_verification:'passed within documented scope',user_aesthetic_approval:'pending',site_adoption:'not performed',
  deliverables:{aep:file('TITAN-Production-v002.aep'),mp4:file('TITAN-Review-v002.mp4')},
  media:{passed:mediaPassed,width:v.width,height:v.height,codec:v.codec_name,fps:v.r_frame_rate,declared_frames:Number(v.nb_frames),decoded_frames:Number(v.nb_read_frames),duration:Number(probe.format.duration),audio_stream_count:0,whole_file_decode_exit_code:0,evidence:'qa/final-media-probe.json'},
  ae:{version:'27.0x43 (Beta)',saved_and_reopened:true,master:measured.master,missing_footage:measured.missing_footage.count,missing_fonts:measured.missing_fonts.count,native_frame_count:42,property_time_evaluation_count:measured.native_property_samples.length,expression_check_scope:measured.expression_check_scope,serialized_project_evidence:'qa/final-native-project.json',note:'Serialized composition contents were exported after reopen and before final render-queue item addition; only the render queue changed afterward.'},
  preservation:{input_count:inputs.length,all_input_bytes_and_sha256_unchanged:true,inputs,original_markers_unchanged:measured.original_markers_unchanged,protected_frames:measured.protected_frames,authored_original_item_diff_count:measured.authored_original_item_differences.length,authored_diff_review:'All 31 differences are allowed CAT/shared-line parenting and out-points, F164+ endpoint extension, and F220+ dot-to-ribbon sizing. Existing non-master items have no authored differences.',native_pixel_note:'F0/39/70/100 are exact. F114/124/135/155/163 have only 81-336 changed RGB channels, MAE <= 0.000203 on the iPad area. This is not a claim of bit-identical protected 3D rendering. No unexplained visible change was found; tiny differences are consistent with native 3D rendering variability.',historical_aep_note:'The older report hash differed from the supplied current file. Current disk, preserved unsaved snapshot and historical serialized authored content had no differences after excluding time-evaluated animated values. Binary change cause is not proven.'},
  mask:measured.red_dot_mask_checks,
  rail_hold_pixel_comparisons:measured.rail_hold_pixel_comparisons,
  result_hold_287_to_314:measured.result_hold_287_to_314,
  playback,
  visual_review:{contact_sheets:['qa/cat_to_sportsbook-sheet.png','qa/sportsbook_to_operations-sheet.png','qa/whole_scene_overlay-sheet.png','qa/rails_stop_and_result-sheet.png'],reviewed:true,findings:['Shared endpoint remains continuous across the CAT-to-Sportsbook scroll.','Actual phone screen changes between F182 and F219; red recording dot is covered.','Operations foreground is readable in its short F234-250 hold; pace remains a user-review decision.','The previous scene stays full size while the entire incoming scene zooms from 600% to 100%; F252 and F260 are sharp and intermediate motion is blurred.','Both rail pixel regions hold from F279; the complete F287/F314 result images are RGB-identical.']},
  departures_and_limitations:['Anchor y205 was recalculated to y251 for the actual reverse-phased native cell as permitted by the brief; initial focused tile is ivory.','Preset timings were customized; refined uses layer opacity because its inactive preset animator opacity was not writable.','aftr wordReveal was adapted to separate native word layers and Amount envelopes rather than copied as an exact Offset sweep.','Phone source is only 332x720; the model physical camera island still overlays the source status-island boundary. No AI upscale or source/UI reconstruction was done.','No exhaustive connector expressionError enumeration is available; 91 scoped property/time evaluations, structural checks and actual renders are the evidence.','The AEP uses local source paths, not a collected portable project.','The planned F315-600 tail is intentionally not built.']
};
write('verification.json',verification);
console.log(JSON.stringify({deliverables:verification.deliverables,media:verification.media,inputs_unchanged:inputs.length,records:['RESULT.ko.md','actual-timeline.json','verification.json','preset-usage.json','qa/playback-verification.json','sources/attribution.md']}));
