type P30NoticePagesAndArticlesProps = {
  className?: string;
  view?: "Page 1" | "Page 2" | "Page 3" | "Page 4" | "Article 1" | "Article 2" | "Article 3" | "Article 4" | "Article 5" | "Article 6" | "Article 7" | "Article 8" | "Article 9" | "Article 10" | "Article 11" | "Article 12" | "Article 13" | "Article 14" | "Article 15" | "Article 16" | "Article 17" | "Article 18" | "Article 19" | "Article 20";
};

export default function P30NoticePagesAndArticles({ className, view = "Page 1" }: P30NoticePagesAndArticlesProps) {
  const isArticle1 = view === "Article 1";
  const isArticle10 = view === "Article 10";
  const isArticle11 = view === "Article 11";
  const isArticle12 = view === "Article 12";
  const isArticle13 = view === "Article 13";
  const isArticle14 = view === "Article 14";
  const isArticle15 = view === "Article 15";
  const isArticle16 = view === "Article 16";
  const isArticle17 = view === "Article 17";
  const isArticle18 = view === "Article 18";
  const isArticle19 = view === "Article 19";
  const isArticle1OrArticle2OrArticle3OrArticle4OrArticle5OrArticle6Or = ["Article 1", "Article 2", "Article 3", "Article 4", "Article 5", "Article 6", "Article 7", "Article 8", "Article 9", "Article 10", "Article 11", "Article 12", "Article 13", "Article 14", "Article 15", "Article 16", "Article 17", "Article 18", "Article 19", "Article 20"].includes(view);
  const isArticle2 = view === "Article 2";
  const isArticle20 = view === "Article 20";
  const isArticle3 = view === "Article 3";
  const isArticle4 = view === "Article 4";
  const isArticle5 = view === "Article 5";
  const isArticle6 = view === "Article 6";
  const isArticle7 = view === "Article 7";
  const isArticle8 = view === "Article 8";
  const isArticle9 = view === "Article 9";
  const isPage1 = view === "Page 1";
  const isPage2 = view === "Page 2";
  const isPage3 = view === "Page 3";
  const isPage4 = view === "Page 4";
  return (
    <div className={className || "backdrop-blur-[4px] bg-gradient-to-b from-[rgba(23,40,62,0.83)] h-[350px] relative rounded-[10px] to-[rgba(23,40,62,0.93)] w-[1328px]"} id={isArticle20 ? "node-1968_1367" : isArticle19 ? "node-1968_1359" : isArticle18 ? "node-1968_1351" : isArticle17 ? "node-1968_1343" : isArticle16 ? "node-1968_1335" : isArticle15 ? "node-1968_1327" : isArticle14 ? "node-1968_1319" : isArticle13 ? "node-1968_1311" : isArticle12 ? "node-1968_1303" : isArticle11 ? "node-1968_1295" : isArticle10 ? "node-1968_1287" : isArticle9 ? "node-1968_1279" : isArticle8 ? "node-1968_1271" : isArticle7 ? "node-1968_1263" : isArticle6 ? "node-1968_1255" : isArticle5 ? "node-1968_1247" : isArticle4 ? "node-1968_1239" : isArticle3 ? "node-1968_1231" : isArticle2 ? "node-1968_1223" : isArticle1 ? "node-1968_1215" : isPage4 ? "node-1968_1184" : isPage3 ? "node-1968_1153" : isPage2 ? "node-1968_1122" : "node-1968_1091"}>
      <div className="absolute h-px left-0 top-0 w-[1328px]" id={isArticle20 ? "node-1968_1368" : isArticle19 ? "node-1968_1360" : isArticle18 ? "node-1968_1352" : isArticle17 ? "node-1968_1344" : isArticle16 ? "node-1968_1336" : isArticle15 ? "node-1968_1328" : isArticle14 ? "node-1968_1320" : isArticle13 ? "node-1968_1312" : isArticle12 ? "node-1968_1304" : isArticle11 ? "node-1968_1296" : isArticle10 ? "node-1968_1288" : isArticle9 ? "node-1968_1280" : isArticle8 ? "node-1968_1272" : isArticle7 ? "node-1968_1264" : isArticle6 ? "node-1968_1256" : isArticle5 ? "node-1968_1248" : isArticle4 ? "node-1968_1240" : isArticle3 ? "node-1968_1232" : isArticle2 ? "node-1968_1224" : isArticle1 ? "node-1968_1216" : isPage4 ? "node-1968_1185" : isPage3 ? "node-1968_1154" : isPage2 ? "node-1968_1123" : "node-1968_1092"} style={{ backgroundImage: "linear-gradient(90deg, rgba(188, 148, 86, 0) 0%, rgba(188, 148, 86, 0.7) 18%, rgba(188, 148, 86, 0.7) 82%, rgba(188, 148, 86, 0) 100%)" }} data-name="Panel / fading brass line" />
      <div className="absolute h-px left-0 top-[349px] w-[1328px]" id={isArticle20 ? "node-1968_1369" : isArticle19 ? "node-1968_1361" : isArticle18 ? "node-1968_1353" : isArticle17 ? "node-1968_1345" : isArticle16 ? "node-1968_1337" : isArticle15 ? "node-1968_1329" : isArticle14 ? "node-1968_1321" : isArticle13 ? "node-1968_1313" : isArticle12 ? "node-1968_1305" : isArticle11 ? "node-1968_1297" : isArticle10 ? "node-1968_1289" : isArticle9 ? "node-1968_1281" : isArticle8 ? "node-1968_1273" : isArticle7 ? "node-1968_1265" : isArticle6 ? "node-1968_1257" : isArticle5 ? "node-1968_1249" : isArticle4 ? "node-1968_1241" : isArticle3 ? "node-1968_1233" : isArticle2 ? "node-1968_1225" : isArticle1 ? "node-1968_1217" : isPage4 ? "node-1968_1186" : isPage3 ? "node-1968_1155" : isPage2 ? "node-1968_1124" : "node-1968_1093"} style={{ backgroundImage: "linear-gradient(90deg, rgba(188, 148, 86, 0) 0%, rgba(188, 148, 86, 0.7) 18%, rgba(188, 148, 86, 0.7) 82%, rgba(188, 148, 86, 0) 100%)" }} data-name="Panel / fading brass line" />
      {isArticle1OrArticle2OrArticle3OrArticle4OrArticle5OrArticle6Or && (
        <>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[32px] justify-center leading-[0] left-[28px] not-italic text-[#fff2cc] text-[24px] top-[38px] w-[1272px]" id={isArticle20 ? "node-1968_1370" : isArticle19 ? "node-1968_1362" : isArticle18 ? "node-1968_1354" : isArticle17 ? "node-1968_1346" : isArticle16 ? "node-1968_1338" : isArticle15 ? "node-1968_1330" : isArticle14 ? "node-1968_1322" : isArticle13 ? "node-1968_1314" : isArticle12 ? "node-1968_1306" : isArticle11 ? "node-1968_1298" : isArticle10 ? "node-1968_1290" : isArticle9 ? "node-1968_1282" : isArticle8 ? "node-1968_1274" : isArticle7 ? "node-1968_1266" : isArticle6 ? "node-1968_1258" : isArticle5 ? "node-1968_1250" : isArticle4 ? "node-1968_1242" : isArticle3 ? "node-1968_1234" : isArticle2 ? "node-1968_1226" : "node-1968_1218"}>
            <p className="leading-[32px]">{isArticle20 ? "これからも油屋をよろしくお願いします" : isArticle19 ? "ご利用ガイドのご紹介" : isArticle18 ? "サービス更新のご案内" : isArticle17 ? "お知らせの確認方法" : isArticle16 ? "各種お手続きのご案内" : isArticle15 ? "よくあるご質問について" : isArticle14 ? "安心してご利用いただくために" : isArticle13 ? "お客様情報の確認について" : isArticle12 ? "サービス時間のご案内" : isArticle11 ? "新しいコンテンツのご紹介" : isArticle10 ? "表示環境に関するご案内" : isArticle9 ? "お問い合わせのご案内" : isArticle8 ? "メール機能について" : isArticle7 ? "ログイン方法のご案内" : isArticle6 ? "アカウント設定について" : isArticle5 ? "湯屋からの夜便り" : isArticle4 ? "ご利用前にご確認ください" : isArticle3 ? "定期メンテナンスのご案内" : isArticle2 ? "お知らせページのご案内" : isArticle1 ? "油屋へようこそ" : ""}</p>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[20px] justify-center leading-[0] left-[28px] not-italic text-[#c9b795] text-[12px] top-[73px] w-[1272px]" id={isArticle20 ? "node-1968_1371" : isArticle19 ? "node-1968_1363" : isArticle18 ? "node-1968_1355" : isArticle17 ? "node-1968_1347" : isArticle16 ? "node-1968_1339" : isArticle15 ? "node-1968_1331" : isArticle14 ? "node-1968_1323" : isArticle13 ? "node-1968_1315" : isArticle12 ? "node-1968_1307" : isArticle11 ? "node-1968_1299" : isArticle10 ? "node-1968_1291" : isArticle9 ? "node-1968_1283" : isArticle8 ? "node-1968_1275" : isArticle7 ? "node-1968_1267" : isArticle6 ? "node-1968_1259" : isArticle5 ? "node-1968_1251" : isArticle4 ? "node-1968_1243" : isArticle3 ? "node-1968_1235" : isArticle2 ? "node-1968_1227" : "node-1968_1219"}>
            <p className="leading-[20px]">{isArticle20 ? "2026.10.14" : isArticle19 ? "2026.10.15" : isArticle18 ? "2026.10.16" : isArticle17 ? "2026.10.17" : isArticle16 ? "2026.10.18" : isArticle15 ? "2026.10.19" : isArticle14 ? "2026.10.20" : isArticle13 ? "2026.10.21" : isArticle12 ? "2026.10.22" : isArticle11 ? "2026.10.23" : isArticle10 ? "2026.10.24" : isArticle9 ? "2026.10.25" : isArticle8 ? "2026.10.26" : isArticle7 ? "2026.10.27" : isArticle6 ? "2026.10.28" : isArticle5 ? "2026.10.29" : isArticle4 ? "2026.10.30" : isArticle3 ? "2026.10.31" : isArticle2 ? "2026.11.01" : isArticle1 ? "2026.11.02" : ""}</p>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] font-medium h-[168px] justify-center leading-[0] left-[28px] text-[#fff2cc] text-[16px] top-[188px] w-[1272px] whitespace-pre-wrap" id={isArticle20 ? "node-1968_1372" : isArticle19 ? "node-1968_1364" : isArticle18 ? "node-1968_1356" : isArticle17 ? "node-1968_1348" : isArticle16 ? "node-1968_1340" : isArticle15 ? "node-1968_1332" : isArticle14 ? "node-1968_1324" : isArticle13 ? "node-1968_1316" : isArticle12 ? "node-1968_1308" : isArticle11 ? "node-1968_1300" : isArticle10 ? "node-1968_1292" : isArticle9 ? "node-1968_1284" : isArticle8 ? "node-1968_1276" : isArticle7 ? "node-1968_1268" : isArticle6 ? "node-1968_1260" : isArticle5 ? "node-1968_1252" : isArticle4 ? "node-1968_1244" : isArticle3 ? "node-1968_1236" : isArticle2 ? "node-1968_1228" : "node-1968_1220"}>
            <p className="leading-[28px] mb-0">{isArticle20 ? "これからも油屋をよろしくお願いします。" : isArticle19 ? "ご利用ガイドのご紹介。" : isArticle18 ? "サービス更新のご案内。" : isArticle17 ? "お知らせの確認方法。" : isArticle16 ? "各種お手続きのご案内。" : isArticle15 ? "よくあるご質問について。" : isArticle14 ? "安心してご利用いただくために。" : isArticle13 ? "お客様情報の確認について。" : isArticle12 ? "サービス時間のご案内。" : isArticle11 ? "新しいコンテンツのご紹介。" : isArticle10 ? "表示環境に関するご案内。" : isArticle9 ? "お問い合わせのご案内。" : isArticle8 ? "メール機能について。" : isArticle7 ? "ログイン方法のご案内。" : isArticle6 ? "アカウント設定について。" : isArticle5 ? "湯屋からの夜便り。" : isArticle4 ? "ご利用前にご確認ください。" : isArticle3 ? "定期メンテナンスのご案内。" : isArticle2 ? "お知らせページのご案内。" : isArticle1 ? "油屋へようこそ。" : ""}</p>
            <p className="leading-[28px] mb-0">​</p>
            <p className="leading-[28px] mb-0">{["Article 2", "Article 3", "Article 4", "Article 5", "Article 6", "Article 7", "Article 8", "Article 9", "Article 10", "Article 11", "Article 12", "Article 13", "Article 14", "Article 15", "Article 16", "Article 17", "Article 18", "Article 19", "Article 20"].includes(view) ? "いつも油屋をご利用いただき、ありがとうございます。ご利用に関するご案内をお届けします。" : isArticle1 ? "油屋へようこそ。心ほどけるひとときを、どうぞゆっくりお楽しみください。" : ""}</p>
            <p className="leading-[28px]">ご不明な点がございましたら、画面上部の「問合せ」よりお気軽にご連絡ください。</p>
          </div>
          <button className="absolute bg-[#26394f] block border-[#bc9456] border-[0.8px] border-solid cursor-pointer h-[34px] left-[28px] rounded-[6px] top-[298px] w-[120px]" id={isArticle20 ? "node-1968_1373" : isArticle19 ? "node-1968_1365" : isArticle18 ? "node-1968_1357" : isArticle17 ? "node-1968_1349" : isArticle16 ? "node-1968_1341" : isArticle15 ? "node-1968_1333" : isArticle14 ? "node-1968_1325" : isArticle13 ? "node-1968_1317" : isArticle12 ? "node-1968_1309" : isArticle11 ? "node-1968_1301" : isArticle10 ? "node-1968_1293" : isArticle9 ? "node-1968_1285" : isArticle8 ? "node-1968_1277" : isArticle7 ? "node-1968_1269" : isArticle6 ? "node-1968_1261" : isArticle5 ? "node-1968_1253" : isArticle4 ? "node-1968_1245" : isArticle3 ? "node-1968_1237" : isArticle2 ? "node-1968_1229" : "node-1968_1221"} data-name="Back / notice list">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] h-[34px] justify-center leading-[0] left-[59.2px] not-italic text-[#fff2cc] text-[13px] text-center top-[16.2px] w-[120px]" id={isArticle20 ? "node-1968_1374" : isArticle19 ? "node-1968_1366" : isArticle18 ? "node-1968_1358" : isArticle17 ? "node-1968_1350" : isArticle16 ? "node-1968_1342" : isArticle15 ? "node-1968_1334" : isArticle14 ? "node-1968_1326" : isArticle13 ? "node-1968_1318" : isArticle12 ? "node-1968_1310" : isArticle11 ? "node-1968_1302" : isArticle10 ? "node-1968_1294" : isArticle9 ? "node-1968_1286" : isArticle8 ? "node-1968_1278" : isArticle7 ? "node-1968_1270" : isArticle6 ? "node-1968_1262" : isArticle5 ? "node-1968_1254" : isArticle4 ? "node-1968_1246" : isArticle3 ? "node-1968_1238" : isArticle2 ? "node-1968_1230" : "node-1968_1222"}>
              <p className="leading-[34px]">一覧に戻る</p>
            </div>
          </button>
        </>
      )}
      {isPage1 && (
        <>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[16px] w-[1280px]" data-node-id="1968:1094" data-name="Post / 油屋へようこそ">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1095">
              <p className="leading-[22px]">油屋へようこそ</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1096">
              <p className="leading-[18px]">2026.11.02</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1097">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[72px] w-[1280px]" data-node-id="1968:1098" data-name="Post / お知らせページのご案内">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1099">
              <p className="leading-[22px]">お知らせページのご案内</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1100">
              <p className="leading-[18px]">2026.11.01</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1101">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[128px] w-[1280px]" data-node-id="1968:1102" data-name="Post / 定期メンテナンスのご案内">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1103">
              <p className="leading-[22px]">定期メンテナンスのご案内</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1104">
              <p className="leading-[18px]">2026.10.31</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1105">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[184px] w-[1280px]" data-node-id="1968:1106" data-name="Post / ご利用前にご確認ください">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1107">
              <p className="leading-[22px]">ご利用前にご確認ください</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1108">
              <p className="leading-[18px]">2026.10.30</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1109">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[240px] w-[1280px]" data-node-id="1968:1110" data-name="Post / 湯屋からの夜便り">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1111">
              <p className="leading-[22px]">湯屋からの夜便り</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1112">
              <p className="leading-[18px]">2026.10.29</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1113">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <div className="absolute bg-[#bc9456] border-[#bc9456] border-[1.4px] border-solid left-[577px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1114" data-name="Go to page 1">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[16.6px] not-italic size-[36px] text-[#100e25] text-[15px] text-center top-[16.6px]" data-node-id="1968:1115">
              <p className="leading-[36px]">1</p>
            </div>
          </div>
          <button className="absolute bg-[#17283e] block border-[#bc9456] border-[0.7px] border-solid cursor-pointer left-[623px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1116" data-name="Go to page 2">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[17.3px] not-italic size-[36px] text-[#fff2cc] text-[15px] text-center top-[17.3px]" data-node-id="1968:1117">
              <p className="leading-[36px]">2</p>
            </div>
          </button>
          <button className="absolute bg-[#17283e] block border-[#bc9456] border-[0.7px] border-solid cursor-pointer left-[669px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1118" data-name="Go to page 3">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[17.3px] not-italic size-[36px] text-[#fff2cc] text-[15px] text-center top-[17.3px]" data-node-id="1968:1119">
              <p className="leading-[36px]">3</p>
            </div>
          </button>
          <button className="absolute bg-[#17283e] block border-[#bc9456] border-[0.7px] border-solid cursor-pointer left-[715px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1120" data-name="Go to page 4">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[17.3px] not-italic size-[36px] text-[#fff2cc] text-[15px] text-center top-[17.3px]" data-node-id="1968:1121">
              <p className="leading-[36px]">4</p>
            </div>
          </button>
        </>
      )}
      {isPage2 && (
        <>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[16px] w-[1280px]" data-node-id="1968:1125" data-name="Post / アカウント設定について">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1126">
              <p className="leading-[22px]">アカウント設定について</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1127">
              <p className="leading-[18px]">2026.10.28</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1128">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[72px] w-[1280px]" data-node-id="1968:1129" data-name="Post / ログイン方法のご案内">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1130">
              <p className="leading-[22px]">ログイン方法のご案内</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1131">
              <p className="leading-[18px]">2026.10.27</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1132">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[128px] w-[1280px]" data-node-id="1968:1133" data-name="Post / メール機能について">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1134">
              <p className="leading-[22px]">メール機能について</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1135">
              <p className="leading-[18px]">2026.10.26</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1136">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[184px] w-[1280px]" data-node-id="1968:1137" data-name="Post / お問い合わせのご案内">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1138">
              <p className="leading-[22px]">お問い合わせのご案内</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1139">
              <p className="leading-[18px]">2026.10.25</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1140">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[240px] w-[1280px]" data-node-id="1968:1141" data-name="Post / 表示環境に関するご案内">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1142">
              <p className="leading-[22px]">表示環境に関するご案内</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1143">
              <p className="leading-[18px]">2026.10.24</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1144">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="absolute bg-[#17283e] block border-[#bc9456] border-[0.7px] border-solid cursor-pointer left-[577px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1145" data-name="Go to page 1">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[17.3px] not-italic size-[36px] text-[#fff2cc] text-[15px] text-center top-[17.3px]" data-node-id="1968:1146">
              <p className="leading-[36px]">1</p>
            </div>
          </button>
          <div className="absolute bg-[#bc9456] border-[#bc9456] border-[1.4px] border-solid left-[623px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1147" data-name="Go to page 2">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[16.6px] not-italic size-[36px] text-[#100e25] text-[15px] text-center top-[16.6px]" data-node-id="1968:1148">
              <p className="leading-[36px]">2</p>
            </div>
          </div>
          <button className="absolute bg-[#17283e] block border-[#bc9456] border-[0.7px] border-solid cursor-pointer left-[669px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1149" data-name="Go to page 3">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[17.3px] not-italic size-[36px] text-[#fff2cc] text-[15px] text-center top-[17.3px]" data-node-id="1968:1150">
              <p className="leading-[36px]">3</p>
            </div>
          </button>
          <button className="absolute bg-[#17283e] block border-[#bc9456] border-[0.7px] border-solid cursor-pointer left-[715px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1151" data-name="Go to page 4">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[17.3px] not-italic size-[36px] text-[#fff2cc] text-[15px] text-center top-[17.3px]" data-node-id="1968:1152">
              <p className="leading-[36px]">4</p>
            </div>
          </button>
        </>
      )}
      {isPage3 && (
        <>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[16px] w-[1280px]" data-node-id="1968:1156" data-name="Post / 新しいコンテンツのご紹介">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1157">
              <p className="leading-[22px]">新しいコンテンツのご紹介</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1158">
              <p className="leading-[18px]">2026.10.23</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1159">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[72px] w-[1280px]" data-node-id="1968:1160" data-name="Post / サービス時間のご案内">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1161">
              <p className="leading-[22px]">サービス時間のご案内</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1162">
              <p className="leading-[18px]">2026.10.22</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1163">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[128px] w-[1280px]" data-node-id="1968:1164" data-name="Post / お客様情報の確認について">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1165">
              <p className="leading-[22px]">お客様情報の確認について</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1166">
              <p className="leading-[18px]">2026.10.21</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1167">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[184px] w-[1280px]" data-node-id="1968:1168" data-name="Post / 安心してご利用いただくために">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1169">
              <p className="leading-[22px]">安心してご利用いただくために</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1170">
              <p className="leading-[18px]">2026.10.20</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1171">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[240px] w-[1280px]" data-node-id="1968:1172" data-name="Post / よくあるご質問について">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1173">
              <p className="leading-[22px]">よくあるご質問について</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1174">
              <p className="leading-[18px]">2026.10.19</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1175">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="absolute bg-[#17283e] block border-[#bc9456] border-[0.7px] border-solid cursor-pointer left-[577px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1176" data-name="Go to page 1">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[17.3px] not-italic size-[36px] text-[#fff2cc] text-[15px] text-center top-[17.3px]" data-node-id="1968:1177">
              <p className="leading-[36px]">1</p>
            </div>
          </button>
          <button className="absolute bg-[#17283e] block border-[#bc9456] border-[0.7px] border-solid cursor-pointer left-[623px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1178" data-name="Go to page 2">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[17.3px] not-italic size-[36px] text-[#fff2cc] text-[15px] text-center top-[17.3px]" data-node-id="1968:1179">
              <p className="leading-[36px]">2</p>
            </div>
          </button>
          <div className="absolute bg-[#bc9456] border-[#bc9456] border-[1.4px] border-solid left-[669px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1180" data-name="Go to page 3">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[16.6px] not-italic size-[36px] text-[#100e25] text-[15px] text-center top-[16.6px]" data-node-id="1968:1181">
              <p className="leading-[36px]">3</p>
            </div>
          </div>
          <button className="absolute bg-[#17283e] block border-[#bc9456] border-[0.7px] border-solid cursor-pointer left-[715px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1182" data-name="Go to page 4">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[17.3px] not-italic size-[36px] text-[#fff2cc] text-[15px] text-center top-[17.3px]" data-node-id="1968:1183">
              <p className="leading-[36px]">4</p>
            </div>
          </button>
        </>
      )}
      {isPage4 && (
        <>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[16px] w-[1280px]" data-node-id="1968:1187" data-name="Post / 各種お手続きのご案内">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1188">
              <p className="leading-[22px]">各種お手続きのご案内</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1189">
              <p className="leading-[18px]">2026.10.18</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1190">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[72px] w-[1280px]" data-node-id="1968:1191" data-name="Post / お知らせの確認方法">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1192">
              <p className="leading-[22px]">お知らせの確認方法</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1193">
              <p className="leading-[18px]">2026.10.17</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1194">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[128px] w-[1280px]" data-node-id="1968:1195" data-name="Post / サービス更新のご案内">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1196">
              <p className="leading-[22px]">サービス更新のご案内</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1197">
              <p className="leading-[18px]">2026.10.16</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1198">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[184px] w-[1280px]" data-node-id="1968:1199" data-name="Post / ご利用ガイドのご紹介">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1200">
              <p className="leading-[22px]">ご利用ガイドのご紹介</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1201">
              <p className="leading-[18px]">2026.10.15</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1202">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="[word-break:break-word] absolute bg-gradient-to-b block border-[#bc9456] border-[0.7px] border-solid cursor-pointer from-[rgba(38,57,79,0.95)] h-[48px] leading-[0] left-[24px] not-italic rounded-[6px] to-[rgba(38,57,79,0.85)] top-[240px] w-[1280px]" data-node-id="1968:1203" data-name="Post / これからも油屋をよろしくお願いします">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[22px] justify-center left-[19.3px] text-[#fff2cc] text-[17px] text-left top-[23.3px] w-[1080px]" data-node-id="1968:1204">
              <p className="leading-[22px]">これからも油屋をよろしくお願いします</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[18px] justify-center left-[1177.3px] text-[#c9b795] text-[11px] text-center top-[23.3px] w-[108px]" data-node-id="1968:1205">
              <p className="leading-[18px]">2026.10.14</p>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Paperlogy:7_Bold'] h-[30px] justify-center left-[1253.3px] text-[#c9b795] text-[26px] text-center top-[22.3px] w-[20px]" data-node-id="1968:1206">
              <p className="leading-[30px]">›</p>
            </div>
          </button>
          <button className="absolute bg-[#17283e] block border-[#bc9456] border-[0.7px] border-solid cursor-pointer left-[577px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1207" data-name="Go to page 1">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[17.3px] not-italic size-[36px] text-[#fff2cc] text-[15px] text-center top-[17.3px]" data-node-id="1968:1208">
              <p className="leading-[36px]">1</p>
            </div>
          </button>
          <button className="absolute bg-[#17283e] block border-[#bc9456] border-[0.7px] border-solid cursor-pointer left-[623px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1209" data-name="Go to page 2">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[17.3px] not-italic size-[36px] text-[#fff2cc] text-[15px] text-center top-[17.3px]" data-node-id="1968:1210">
              <p className="leading-[36px]">2</p>
            </div>
          </button>
          <button className="absolute bg-[#17283e] block border-[#bc9456] border-[0.7px] border-solid cursor-pointer left-[669px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1211" data-name="Go to page 3">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[17.3px] not-italic size-[36px] text-[#fff2cc] text-[15px] text-center top-[17.3px]" data-node-id="1968:1212">
              <p className="leading-[36px]">3</p>
            </div>
          </button>
          <div className="absolute bg-[#bc9456] border-[#bc9456] border-[1.4px] border-solid left-[715px] rounded-[6px] size-[36px] top-[304px]" data-node-id="1968:1213" data-name="Go to page 4">
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[16.6px] not-italic size-[36px] text-[#100e25] text-[15px] text-center top-[16.6px]" data-node-id="1968:1214">
              <p className="leading-[36px]">4</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
