const imgPageGeneratedTile = "https://www.figma.com/api/mcp/asset/77885571-0789-44b5-8ecb-39ea54bfba16.png";
const imgImageRightGeneratedPng = "https://www.figma.com/api/mcp/asset/11b9bdb5-9e13-4be4-a2a0-6a869c42ecd0.png";
const imgPostGeneratedNavyGoldRow = "https://www.figma.com/api/mcp/asset/4e8986a6-48c8-431b-a016-54348d0d9219.png";
const imgNoticeGeneratedReadingPanel = "https://www.figma.com/api/mcp/asset/6cccd7d4-5a26-4417-a695-399d706e6b47.png";
const imgSkinCapsule = "https://www.figma.com/api/mcp/asset/10197c31-24c0-4dd7-be9b-4df96c491676.png";

type P31PaginationButtonProps = {
  className?: string;
  number?: string;
  state?: "Default" | "Selected";
};

function P31PaginationButton({ className, number = "1", state = "Default" }: P31PaginationButtonProps) {
  const isSelected = state === "Selected";
  return (
    <div className={className || "relative size-[36px]"} id={isSelected ? "node-2572_3639" : "node-2572_3633"}>
      <div className="absolute left-0 size-[36px] top-0" id={isSelected ? "node-2572_3640" : "node-2572_3634"} data-name="Page / generated tile">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[123.06%] left-[-10.54%] max-w-none top-[-12.37%] w-[121.28%]" src={imgPageGeneratedTile} />
        </div>
      </div>
      {state === "Default" && (
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[26px] justify-center leading-[0] left-[18px] not-italic text-[#f6dda6] text-[16px] text-center top-[18px] w-[36px]" data-node-id="2572:3635">
          <p className="leading-[normal]">{number}</p>
        </div>
      )}
      {isSelected && (
        <>
          <div className="absolute bg-[rgba(239,125,50,0.4)] left-[3px] rounded-[7px] size-[30px] top-[3px]" data-node-id="2572:3641" data-name="Page / selected tint" />
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[26px] justify-center leading-[0] left-[18px] not-italic text-[#f6dda6] text-[16px] text-center top-[18px] w-[36px]" data-node-id="2572:3642">
            <p className="leading-[normal]">{number}</p>
          </div>
          <div className="absolute bg-[#ffe7a0] h-[2px] left-[12px] rounded-[1px] top-[29px] w-[12px]" data-node-id="2572:3643" data-name="Page / selected underline" />
        </>
      )}
    </div>
  );
}

function P31IconRight24({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="2572:2244" data-name="P31 / Icon / right / 24">
      <div className="absolute inset-[10.87%_0]" data-node-id="2572:2247" data-name="Image / right / generated PNG">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[156.53%] left-[-10.13%] max-w-none top-[-29.65%] w-[124.09%]" src={imgImageRightGeneratedPng} />
        </div>
      </div>
    </div>
  );
}

type P31NoticePostRowProps = {
  className?: string;
  date?: string;
  state?: "Default";
  title?: string;
};

function P31NoticePostRow({ className, date = "2026.10.30", state = "Default", title = "お知らせ" }: P31NoticePostRowProps) {
  return (
    <div className={className || "h-[48px] relative w-[1280px]"} data-node-id="2572:3622">
      <div className="absolute h-[48px] left-0 top-0 w-[1280px]" data-node-id="2572:3623" data-name="Post / generated navy-gold row">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[914.29%] left-[-0.34%] max-w-none top-[-407.14%] w-[100.69%]" src={imgPostGeneratedNavyGoldRow} />
        </div>
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] h-[26px] justify-center leading-[0] left-[24px] not-italic text-[#f4f0e6] text-[18px] top-[24px] w-[1000px]" data-node-id="2572:3624">
        <p className="leading-[normal]">{title}</p>
      </div>
      <div className="-translate-x-full -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[22px] justify-center leading-[0] left-[1202px] not-italic text-[#e8d6a8] text-[16px] text-right top-[24px] w-[140px]" data-node-id="2572:3625">
        <p className="leading-[normal]">{date}</p>
      </div>
      <P31IconRight24 className="absolute left-[1236px] size-[24px] top-[12px]" />
    </div>
  );
}

type P31NoticeBoardListsAndArticlesProps = {
  className?: string;
  view?: "Page 1" | "Page 2" | "Page 3" | "Page 4" | "Article 1" | "Article 2" | "Article 3" | "Article 4" | "Article 5" | "Article 6" | "Article 7" | "Article 8" | "Article 9" | "Article 10" | "Article 11" | "Article 12" | "Article 13" | "Article 14" | "Article 15" | "Article 16" | "Article 17" | "Article 18" | "Article 19" | "Article 20";
};

export default function P31NoticeBoardListsAndArticles({ className, view = "Page 1" }: P31NoticeBoardListsAndArticlesProps) {
  const isArticle1 = view === "Article 1";
  const isArticle10 = view === "Article 10";
  const isArticle11 = view === "Article 11";
  const isArticle11OrArticle12OrArticle13OrArticle14OrArticle15 = ["Article 11", "Article 12", "Article 13", "Article 14", "Article 15"].includes(view);
  const isArticle12 = view === "Article 12";
  const isArticle13 = view === "Article 13";
  const isArticle14 = view === "Article 14";
  const isArticle15 = view === "Article 15";
  const isArticle16 = view === "Article 16";
  const isArticle16OrArticle17OrArticle18OrArticle19OrArticle20 = ["Article 16", "Article 17", "Article 18", "Article 19", "Article 20"].includes(view);
  const isArticle17 = view === "Article 17";
  const isArticle18 = view === "Article 18";
  const isArticle19 = view === "Article 19";
  const isArticle1OrArticle2OrArticle3OrArticle4OrArticle5 = ["Article 1", "Article 2", "Article 3", "Article 4", "Article 5"].includes(view);
  const isArticle2 = view === "Article 2";
  const isArticle20 = view === "Article 20";
  const isArticle3 = view === "Article 3";
  const isArticle4 = view === "Article 4";
  const isArticle5 = view === "Article 5";
  const isArticle6 = view === "Article 6";
  const isArticle6OrArticle7OrArticle8OrArticle9OrArticle10 = ["Article 6", "Article 7", "Article 8", "Article 9", "Article 10"].includes(view);
  const isArticle7 = view === "Article 7";
  const isArticle8 = view === "Article 8";
  const isArticle9 = view === "Article 9";
  const isPage1OrPage2OrPage3OrPage4 = ["Page 1", "Page 2", "Page 3", "Page 4"].includes(view);
  const isPage2 = view === "Page 2";
  const isPage3 = view === "Page 3";
  const isPage4 = view === "Page 4";
  return (
    <div className={className || "h-[350px] relative w-[1328px]"} id={isArticle20 ? "node-2572_3830" : isArticle19 ? "node-2572_3823" : isArticle18 ? "node-2572_3816" : isArticle17 ? "node-2572_3809" : isArticle16 ? "node-2572_3802" : isArticle15 ? "node-2572_3795" : isArticle14 ? "node-2572_3788" : isArticle13 ? "node-2572_3781" : isArticle12 ? "node-2572_3774" : isArticle11 ? "node-2572_3767" : isArticle10 ? "node-2572_3760" : isArticle9 ? "node-2572_3753" : isArticle8 ? "node-2572_3746" : isArticle7 ? "node-2572_3739" : isArticle6 ? "node-2572_3732" : isArticle5 ? "node-2572_3725" : isArticle4 ? "node-2572_3718" : isArticle3 ? "node-2572_3711" : isArticle2 ? "node-2572_3704" : isArticle1 ? "node-2572_3697" : isPage4 ? "node-2572_3684" : isPage3 ? "node-2572_3671" : isPage2 ? "node-2572_3658" : "node-2572_3645"}>
      <div className="absolute h-[350px] left-0 shadow-[0px_3px_8px_0px_rgba(5,10,20,0.3)] top-0 w-[1328px]" id={isArticle20 ? "node-2572_3831" : isArticle19 ? "node-2572_3824" : isArticle18 ? "node-2572_3817" : isArticle17 ? "node-2572_3810" : isArticle16 ? "node-2572_3803" : isArticle15 ? "node-2572_3796" : isArticle14 ? "node-2572_3789" : isArticle13 ? "node-2572_3782" : isArticle12 ? "node-2572_3775" : isArticle11 ? "node-2572_3768" : isArticle10 ? "node-2572_3761" : isArticle9 ? "node-2572_3754" : isArticle8 ? "node-2572_3747" : isArticle7 ? "node-2572_3740" : isArticle6 ? "node-2572_3733" : isArticle5 ? "node-2572_3726" : isArticle4 ? "node-2572_3719" : isArticle3 ? "node-2572_3712" : isArticle2 ? "node-2572_3705" : isArticle1 ? "node-2572_3698" : isPage4 ? "node-2572_3685" : isPage3 ? "node-2572_3672" : isPage2 ? "node-2572_3659" : "node-2572_3646"} data-name="Notice / generated reading panel">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[134.89%] left-[-1.76%] max-w-none top-[-13.06%] w-[103.52%]" src={imgNoticeGeneratedReadingPanel} />
        </div>
      </div>
      {isArticle1OrArticle2OrArticle3OrArticle4OrArticle5 && (
        <>
          <button className="absolute block cursor-pointer h-[40px] left-[48px] top-[28px] w-[124px]" id={isArticle5 ? "node-2572_3727" : isArticle4 ? "node-2572_3720" : isArticle3 ? "node-2572_3713" : isArticle2 ? "node-2572_3706" : "node-2572_3699"} data-name="Back to page 1">
            <div className="-translate-y-1/2 absolute h-[40px] left-0 right-0 top-1/2" id={isArticle5 ? "node-I2572_3727-2572_2259" : isArticle4 ? "node-I2572_3720-2572_2259" : isArticle3 ? "node-I2572_3713-2572_2259" : isArticle2 ? "node-I2572_3706-2572_2259" : "node-I2572_3699-2572_2259"} data-name="Skin / capsule">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[106.16%] left-[-0.14%] max-w-none top-[-3.08%] w-[100.46%]" src={imgSkinCapsule} />
              </div>
            </div>
            <div className="absolute left-[12px] size-[24px] top-[8px]" id={isArticle5 ? "node-I2572_3727-2572_2261" : isArticle4 ? "node-I2572_3720-2572_2261" : isArticle3 ? "node-I2572_3713-2572_2261" : isArticle2 ? "node-I2572_3706-2572_2261" : "node-I2572_3699-2572_2261"} data-name="Action / icon">
              <div className="absolute inset-[10.87%_0]" id={isArticle5 ? "node-I2572_3727-2572_2261-2572_2235" : isArticle4 ? "node-I2572_3720-2572_2261-2572_2235" : isArticle3 ? "node-I2572_3713-2572_2261-2572_2235" : isArticle2 ? "node-I2572_3706-2572_2261-2572_2235" : "node-I2572_3699-2572_2261-2572_2235"} data-name="Image / left / generated PNG">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[156.53%] left-[110.13%] max-w-none top-[-29.65%] w-[-124.09%]" src={imgImageRightGeneratedPng} />
                </div>
              </div>
            </div>
            <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[32px] justify-center leading-[0] left-[24px] not-italic right-[24px] text-[16px] text-[color:var(--db-ivory,#f4f0e6)] text-center top-1/2" id={isArticle5 ? "node-I2572_3727-2572_2262" : isArticle4 ? "node-I2572_3720-2572_2262" : isArticle3 ? "node-I2572_3713-2572_2262" : isArticle2 ? "node-I2572_3706-2572_2262" : "node-I2572_3699-2572_2262"}>
              <p className="leading-[normal]">戻る</p>
            </div>
          </button>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] h-[32px] justify-center leading-[0] left-[196px] not-italic text-[#fff0c5] text-[22px] top-[44px] w-[956px]" id={isArticle5 ? "node-2572_3728" : isArticle4 ? "node-2572_3721" : isArticle3 ? "node-2572_3714" : isArticle2 ? "node-2572_3707" : "node-2572_3700"}>
            <p className="leading-[normal]">{isArticle5 ? "カプセル通信からのお便り" : isArticle4 ? "新しいゲームが仲間入り" : isArticle3 ? "定期メンテナンスのお知らせ" : isArticle2 ? "お知らせページのご案内" : isArticle1 ? "ドラゴンボール Zへようこそ" : ""}</p>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[24px] justify-center leading-[0] left-[196px] not-italic text-[#e6d2a8] text-[17px] top-[82px] w-[956px]" id={isArticle5 ? "node-2572_3729" : isArticle4 ? "node-2572_3722" : isArticle3 ? "node-2572_3715" : isArticle2 ? "node-2572_3708" : "node-2572_3701"}>
            <p className="leading-[normal]">{isArticle5 ? "2026.10.26" : isArticle4 ? "2026.10.27" : isArticle3 ? "2026.10.28" : isArticle2 ? "2026.10.29" : isArticle1 ? "2026.10.30" : ""}</p>
          </div>
          <div className="absolute bg-[rgba(214,167,78,0.6)] h-px left-[48px] top-[108px] w-[1232px]" id={isArticle5 ? "node-2572_3730" : isArticle4 ? "node-2572_3723" : isArticle3 ? "node-2572_3716" : isArticle2 ? "node-2572_3709" : "node-2572_3702"} data-name="Article / divider" />
          <div className="[word-break:break-word] absolute font-['Paperlogy:4_Regular'] font-normal h-[196px] leading-[0] left-[48px] text-[#f4f0e6] text-[19px] top-[130px] w-[1232px] whitespace-pre-wrap" id={isArticle5 ? "node-2572_3731" : isArticle4 ? "node-2572_3724" : isArticle3 ? "node-2572_3717" : isArticle2 ? "node-2572_3710" : "node-2572_3703"}>
            <p className="leading-[28px] mb-[8px]">{isArticle5 ? "カプセルコーポレーションから、新しいお便りをお届けします。" : isArticle4 ? "ゲーム一覧に、新しい仲間が加わりました。" : isArticle3 ? "いつもドラゴンボール Zをご利用いただきありがとうございます。" : isArticle2 ? "新しい情報やサービスのご案内を、このページからお届けします。" : isArticle1 ? "冒険の世界で、新しい楽しみを。" : ""}</p>
            <p className="leading-[28px] mb-[8px]">​</p>
            <p className="leading-[28px] mb-[8px]">{isArticle5 ? "いつもの仲間たちとともに、ドラゴンボール Z の世界をお楽しみください。" : isArticle4 ? "ライブカジノやスロットゲームのページから、気になるゲームを探してみてください。" : isArticle3 ? "安定したサービスのため、定期メンテナンスを予定しています。" : isArticle2 ? "気になるお知らせを選ぶと、詳しい内容をご覧いただけます。" : isArticle1 ? "ドラゴンボール Z では、さまざまなゲームとともに皆さまをお待ちしています。" : ""}</p>
            <p className="leading-[28px]">{isArticle5 ? "サービスの情報は、こちらのお知らせからご案内します。" : isArticle4 ? "ご自分のペースでお楽しみください。" : isArticle3 ? "実施日時や対象については、決まり次第こちらでご案内します。" : isArticle2 ? "これからも、ドラゴンボール Zをよろしくお願いいたします。" : isArticle1 ? "おなじみの仲間たちと、お気に入りの楽しみを見つけてください。" : ""}</p>
          </div>
        </>
      )}
      {isArticle6OrArticle7OrArticle8OrArticle9OrArticle10 && (
        <>
          <button className="absolute block cursor-pointer h-[40px] left-[48px] top-[28px] w-[124px]" id={isArticle10 ? "node-2572_3762" : isArticle9 ? "node-2572_3755" : isArticle8 ? "node-2572_3748" : isArticle7 ? "node-2572_3741" : "node-2572_3734"} data-name="Back to page 2">
            <div className="-translate-y-1/2 absolute h-[40px] left-0 right-0 top-1/2" id={isArticle10 ? "node-I2572_3762-2572_2259" : isArticle9 ? "node-I2572_3755-2572_2259" : isArticle8 ? "node-I2572_3748-2572_2259" : isArticle7 ? "node-I2572_3741-2572_2259" : "node-I2572_3734-2572_2259"} data-name="Skin / capsule">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[106.16%] left-[-0.14%] max-w-none top-[-3.08%] w-[100.46%]" src={imgSkinCapsule} />
              </div>
            </div>
            <div className="absolute left-[12px] size-[24px] top-[8px]" id={isArticle10 ? "node-I2572_3762-2572_2261" : isArticle9 ? "node-I2572_3755-2572_2261" : isArticle8 ? "node-I2572_3748-2572_2261" : isArticle7 ? "node-I2572_3741-2572_2261" : "node-I2572_3734-2572_2261"} data-name="Action / icon">
              <div className="absolute inset-[10.87%_0]" id={isArticle10 ? "node-I2572_3762-2572_2261-2572_2235" : isArticle9 ? "node-I2572_3755-2572_2261-2572_2235" : isArticle8 ? "node-I2572_3748-2572_2261-2572_2235" : isArticle7 ? "node-I2572_3741-2572_2261-2572_2235" : "node-I2572_3734-2572_2261-2572_2235"} data-name="Image / left / generated PNG">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[156.53%] left-[110.13%] max-w-none top-[-29.65%] w-[-124.09%]" src={imgImageRightGeneratedPng} />
                </div>
              </div>
            </div>
            <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[32px] justify-center leading-[0] left-[24px] not-italic right-[24px] text-[16px] text-[color:var(--db-ivory,#f4f0e6)] text-center top-1/2" id={isArticle10 ? "node-I2572_3762-2572_2262" : isArticle9 ? "node-I2572_3755-2572_2262" : isArticle8 ? "node-I2572_3748-2572_2262" : isArticle7 ? "node-I2572_3741-2572_2262" : "node-I2572_3734-2572_2262"}>
              <p className="leading-[normal]">戻る</p>
            </div>
          </button>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] h-[32px] justify-center leading-[0] left-[196px] not-italic text-[#fff0c5] text-[22px] top-[44px] w-[956px]" id={isArticle10 ? "node-2572_3763" : isArticle9 ? "node-2572_3756" : isArticle8 ? "node-2572_3749" : isArticle7 ? "node-2572_3742" : "node-2572_3735"}>
            <p className="leading-[normal]">{isArticle10 ? "アカウント設定について" : isArticle9 ? "ゲーム一覧の見つけ方" : isArticle8 ? "お問い合わせのご案内" : isArticle7 ? "ご利用ガイドを更新しました" : isArticle6 ? "新しい冒険のお知らせ" : ""}</p>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[24px] justify-center leading-[0] left-[196px] not-italic text-[#e6d2a8] text-[17px] top-[82px] w-[956px]" id={isArticle10 ? "node-2572_3764" : isArticle9 ? "node-2572_3757" : isArticle8 ? "node-2572_3750" : isArticle7 ? "node-2572_3743" : "node-2572_3736"}>
            <p className="leading-[normal]">{isArticle10 ? "2026.10.21" : isArticle9 ? "2026.10.22" : isArticle8 ? "2026.10.23" : isArticle7 ? "2026.10.24" : isArticle6 ? "2026.10.25" : ""}</p>
          </div>
          <div className="absolute bg-[rgba(214,167,78,0.6)] h-px left-[48px] top-[108px] w-[1232px]" id={isArticle10 ? "node-2572_3765" : isArticle9 ? "node-2572_3758" : isArticle8 ? "node-2572_3751" : isArticle7 ? "node-2572_3744" : "node-2572_3737"} data-name="Article / divider" />
          <div className="[word-break:break-word] absolute font-['Paperlogy:4_Regular'] font-normal h-[196px] leading-[0] left-[48px] text-[#f4f0e6] text-[19px] top-[130px] w-[1232px] whitespace-pre-wrap" id={isArticle10 ? "node-2572_3766" : isArticle9 ? "node-2572_3759" : isArticle8 ? "node-2572_3752" : isArticle7 ? "node-2572_3745" : "node-2572_3738"}>
            <p className="leading-[28px] mb-[8px]">{isArticle10 ? "アカウント情報は、ご自身で大切に管理してください。" : isArticle9 ? "画面下のメニューから、各ゲームの一覧へ移動できます。" : isArticle8 ? "お困りの際は、画面上部のお問い合わせをご利用ください。" : isArticle7 ? "ご利用ガイドの内容を見直しました。" : isArticle6 ? "新しい冒険の入口が、皆さまをお待ちしています。" : ""}</p>
            <p className="leading-[28px] mb-[8px]">​</p>
            <p className="leading-[28px] mb-[8px]">{isArticle10 ? "設定についてご不明な点がある場合は、お問い合わせをご利用ください。" : isArticle9 ? "ライブカジノとスロットゲームには、それぞれの提供会社が並んでいます。" : isArticle8 ? "内容を確認したうえで、担当者よりご案内します。" : isArticle7 ? "サービスの使い方について迷った際は、ガイドをご確認ください。" : isArticle6 ? "ドラゴンボール Z の新しい情報を、これからもこちらでご案内します。" : ""}</p>
            <p className="leading-[28px]">{isArticle10 ? "皆さまが快適にご利用いただけるよう、ご案内します。" : isArticle9 ? "お気に入りの入口を見つけてみてください。" : isArticle8 ? "安心してお過ごしいただけるよう、皆さまのお声をお待ちしています。" : isArticle7 ? "ご不明な点は、お問い合わせからお知らせください。" : isArticle6 ? "お気に入りの楽しみを見つけてください。" : ""}</p>
          </div>
        </>
      )}
      {isArticle11OrArticle12OrArticle13OrArticle14OrArticle15 && (
        <>
          <button className="absolute block cursor-pointer h-[40px] left-[48px] top-[28px] w-[124px]" id={isArticle15 ? "node-2572_3797" : isArticle14 ? "node-2572_3790" : isArticle13 ? "node-2572_3783" : isArticle12 ? "node-2572_3776" : "node-2572_3769"} data-name="Back to page 3">
            <div className="-translate-y-1/2 absolute h-[40px] left-0 right-0 top-1/2" id={isArticle15 ? "node-I2572_3797-2572_2259" : isArticle14 ? "node-I2572_3790-2572_2259" : isArticle13 ? "node-I2572_3783-2572_2259" : isArticle12 ? "node-I2572_3776-2572_2259" : "node-I2572_3769-2572_2259"} data-name="Skin / capsule">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[106.16%] left-[-0.14%] max-w-none top-[-3.08%] w-[100.46%]" src={imgSkinCapsule} />
              </div>
            </div>
            <div className="absolute left-[12px] size-[24px] top-[8px]" id={isArticle15 ? "node-I2572_3797-2572_2261" : isArticle14 ? "node-I2572_3790-2572_2261" : isArticle13 ? "node-I2572_3783-2572_2261" : isArticle12 ? "node-I2572_3776-2572_2261" : "node-I2572_3769-2572_2261"} data-name="Action / icon">
              <div className="absolute inset-[10.87%_0]" id={isArticle15 ? "node-I2572_3797-2572_2261-2572_2235" : isArticle14 ? "node-I2572_3790-2572_2261-2572_2235" : isArticle13 ? "node-I2572_3783-2572_2261-2572_2235" : isArticle12 ? "node-I2572_3776-2572_2261-2572_2235" : "node-I2572_3769-2572_2261-2572_2235"} data-name="Image / left / generated PNG">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[156.53%] left-[110.13%] max-w-none top-[-29.65%] w-[-124.09%]" src={imgImageRightGeneratedPng} />
                </div>
              </div>
            </div>
            <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[32px] justify-center leading-[0] left-[24px] not-italic right-[24px] text-[16px] text-[color:var(--db-ivory,#f4f0e6)] text-center top-1/2" id={isArticle15 ? "node-I2572_3797-2572_2262" : isArticle14 ? "node-I2572_3790-2572_2262" : isArticle13 ? "node-I2572_3783-2572_2262" : isArticle12 ? "node-I2572_3776-2572_2262" : "node-I2572_3769-2572_2262"}>
              <p className="leading-[normal]">戻る</p>
            </div>
          </button>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] h-[32px] justify-center leading-[0] left-[196px] not-italic text-[#fff0c5] text-[22px] top-[44px] w-[956px]" id={isArticle15 ? "node-2572_3798" : isArticle14 ? "node-2572_3791" : isArticle13 ? "node-2572_3784" : isArticle12 ? "node-2572_3777" : "node-2572_3770"}>
            <p className="leading-[normal]">{isArticle15 ? "よくあるご質問のご案内" : isArticle14 ? "ご意見をお聞かせください" : isArticle13 ? "表示内容の更新について" : isArticle12 ? "冒険の入口をご案内します" : isArticle11 ? "サービスからのお便り" : ""}</p>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[24px] justify-center leading-[0] left-[196px] not-italic text-[#e6d2a8] text-[17px] top-[82px] w-[956px]" id={isArticle15 ? "node-2572_3799" : isArticle14 ? "node-2572_3792" : isArticle13 ? "node-2572_3785" : isArticle12 ? "node-2572_3778" : "node-2572_3771"}>
            <p className="leading-[normal]">{isArticle15 ? "2026.10.16" : isArticle14 ? "2026.10.17" : isArticle13 ? "2026.10.18" : isArticle12 ? "2026.10.19" : isArticle11 ? "2026.10.20" : ""}</p>
          </div>
          <div className="absolute bg-[rgba(214,167,78,0.6)] h-px left-[48px] top-[108px] w-[1232px]" id={isArticle15 ? "node-2572_3800" : isArticle14 ? "node-2572_3793" : isArticle13 ? "node-2572_3786" : isArticle12 ? "node-2572_3779" : "node-2572_3772"} data-name="Article / divider" />
          <div className="[word-break:break-word] absolute font-['Paperlogy:4_Regular'] font-normal h-[196px] leading-[0] left-[48px] text-[#f4f0e6] text-[19px] top-[130px] w-[1232px] whitespace-pre-wrap" id={isArticle15 ? "node-2572_3801" : isArticle14 ? "node-2572_3794" : isArticle13 ? "node-2572_3787" : isArticle12 ? "node-2572_3780" : "node-2572_3773"}>
            <p className="leading-[28px] mb-[8px]">{isArticle15 ? "サービスについて気になることがある際は、ご利用ガイドをご確認ください。" : isArticle14 ? "ドラゴンボール Zへのご意見やご感想をお待ちしています。" : isArticle13 ? "ページの表示内容を順次更新しています。" : isArticle12 ? "おすすめゲームから、お気に入りの世界へ。" : isArticle11 ? "いつもドラゴンボール Zをご利用いただきありがとうございます。" : ""}</p>
            <p className="leading-[28px] mb-[8px]">​</p>
            <p className="leading-[28px] mb-[8px]">{isArticle15 ? "解決しない場合は、お問い合わせをご利用いただけます。" : isArticle14 ? "お気づきの点は、お問い合わせからお知らせください。" : isArticle13 ? "新しい情報をお届けできるよう、これからも内容を整えてまいります。" : isArticle12 ? "画面下のメニューを使うと、各ページへ移動できます。" : isArticle11 ? "サービスに関する新しい情報は、こちらに掲載します。" : ""}</p>
            <p className="leading-[28px]">{isArticle15 ? "ひとつずつ、わかりやすくご案内します。" : isArticle14 ? "より心地よい場所を目指して、皆さまのお声を参考にします。" : isArticle13 ? "更新のご案内は、このお知らせに掲載します。" : isArticle12 ? "お知らせも、ときどきのぞいてみてください。" : isArticle11 ? "今後ともドラゴンボール Zをよろしくお願いいたします。" : ""}</p>
          </div>
        </>
      )}
      {isArticle16OrArticle17OrArticle18OrArticle19OrArticle20 && (
        <>
          <button className="absolute block cursor-pointer h-[40px] left-[48px] top-[28px] w-[124px]" id={isArticle20 ? "node-2572_3832" : isArticle19 ? "node-2572_3825" : isArticle18 ? "node-2572_3818" : isArticle17 ? "node-2572_3811" : "node-2572_3804"} data-name="Back to page 4">
            <div className="-translate-y-1/2 absolute h-[40px] left-0 right-0 top-1/2" id={isArticle20 ? "node-I2572_3832-2572_2259" : isArticle19 ? "node-I2572_3825-2572_2259" : isArticle18 ? "node-I2572_3818-2572_2259" : isArticle17 ? "node-I2572_3811-2572_2259" : "node-I2572_3804-2572_2259"} data-name="Skin / capsule">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[106.16%] left-[-0.14%] max-w-none top-[-3.08%] w-[100.46%]" src={imgSkinCapsule} />
              </div>
            </div>
            <div className="absolute left-[12px] size-[24px] top-[8px]" id={isArticle20 ? "node-I2572_3832-2572_2261" : isArticle19 ? "node-I2572_3825-2572_2261" : isArticle18 ? "node-I2572_3818-2572_2261" : isArticle17 ? "node-I2572_3811-2572_2261" : "node-I2572_3804-2572_2261"} data-name="Action / icon">
              <div className="absolute inset-[10.87%_0]" id={isArticle20 ? "node-I2572_3832-2572_2261-2572_2235" : isArticle19 ? "node-I2572_3825-2572_2261-2572_2235" : isArticle18 ? "node-I2572_3818-2572_2261-2572_2235" : isArticle17 ? "node-I2572_3811-2572_2261-2572_2235" : "node-I2572_3804-2572_2261-2572_2235"} data-name="Image / left / generated PNG">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[156.53%] left-[110.13%] max-w-none top-[-29.65%] w-[-124.09%]" src={imgImageRightGeneratedPng} />
                </div>
              </div>
            </div>
            <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[32px] justify-center leading-[0] left-[24px] not-italic right-[24px] text-[16px] text-[color:var(--db-ivory,#f4f0e6)] text-center top-1/2" id={isArticle20 ? "node-I2572_3832-2572_2262" : isArticle19 ? "node-I2572_3825-2572_2262" : isArticle18 ? "node-I2572_3818-2572_2262" : isArticle17 ? "node-I2572_3811-2572_2262" : "node-I2572_3804-2572_2262"}>
              <p className="leading-[normal]">戻る</p>
            </div>
          </button>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] h-[32px] justify-center leading-[0] left-[196px] not-italic text-[#fff0c5] text-[22px] top-[44px] w-[956px]" id={isArticle20 ? "node-2572_3833" : isArticle19 ? "node-2572_3826" : isArticle18 ? "node-2572_3819" : isArticle17 ? "node-2572_3812" : "node-2572_3805"}>
            <p className="leading-[normal]">{isArticle20 ? "ドラゴンボール Zから皆さまへ" : isArticle19 ? "お知らせの確認方法" : isArticle18 ? "ゲーム提供会社について" : isArticle17 ? "亀ハウスでひと休み" : isArticle16 ? "仲間たちからのご挨拶" : ""}</p>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[24px] justify-center leading-[0] left-[196px] not-italic text-[#e6d2a8] text-[17px] top-[82px] w-[956px]" id={isArticle20 ? "node-2572_3834" : isArticle19 ? "node-2572_3827" : isArticle18 ? "node-2572_3820" : isArticle17 ? "node-2572_3813" : "node-2572_3806"}>
            <p className="leading-[normal]">{isArticle20 ? "2026.10.11" : isArticle19 ? "2026.10.12" : isArticle18 ? "2026.10.13" : isArticle17 ? "2026.10.14" : isArticle16 ? "2026.10.15" : ""}</p>
          </div>
          <div className="absolute bg-[rgba(214,167,78,0.6)] h-px left-[48px] top-[108px] w-[1232px]" id={isArticle20 ? "node-2572_3835" : isArticle19 ? "node-2572_3828" : isArticle18 ? "node-2572_3821" : isArticle17 ? "node-2572_3814" : "node-2572_3807"} data-name="Article / divider" />
          <div className="[word-break:break-word] absolute font-['Paperlogy:4_Regular'] font-normal h-[196px] leading-[0] left-[48px] text-[#f4f0e6] text-[19px] top-[130px] w-[1232px] whitespace-pre-wrap" id={isArticle20 ? "node-2572_3836" : isArticle19 ? "node-2572_3829" : isArticle18 ? "node-2572_3822" : isArticle17 ? "node-2572_3815" : "node-2572_3808"}>
            <p className="leading-[28px] mb-[8px]">{isArticle20 ? "冒険の世界に、お立ち寄りいただきありがとうございます。" : isArticle19 ? "一覧に並ぶタイトルを選ぶと、詳しい内容をご覧いただけます。" : isArticle18 ? "各ゲームページには、提供会社の一覧を掲載しています。" : isArticle17 ? "青い海と波の音に包まれた、亀ハウスのひととき。" : isArticle16 ? "今日もドラゴンボール Z にお越しいただき、ありがとうございます。" : ""}</p>
            <p className="leading-[28px] mb-[8px]">​</p>
            <p className="leading-[28px] mb-[8px]">{isArticle20 ? "これからも、楽しいひとときをお届けできるよう努めてまいります。" : isArticle19 ? "一覧に戻る際は、戻るボタンをご利用ください。" : isArticle18 ? "会社のロゴを目印に、気になるゲームを探してみてください。" : isArticle17 ? "冒険の合間に、ゆったりとした時間をお過ごしください。" : isArticle16 ? "おなじみの仲間たちとともに、皆さまをお待ちしています。" : ""}</p>
            <p className="leading-[28px]">{isArticle20 ? "ドラゴンボール Z をどうぞよろしくお願いいたします。" : isArticle19 ? "下の数字から、過去のお知らせへ移動できます。" : isArticle18 ? "新しいご案内がある際は、このページでお知らせします。" : isArticle17 ? "お知らせでは、サービスの情報をお届けしています。" : isArticle16 ? "どうぞ、ごゆっくりお楽しみください。" : ""}</p>
          </div>
        </>
      )}
      {isPage1OrPage2OrPage3OrPage4 && (
        <>
          <div className="absolute cursor-pointer h-[272px] left-[24px] top-[16px] w-[1280px]" id={isPage4 ? "node-2572_3686" : isPage3 ? "node-2572_3673" : isPage2 ? "node-2572_3660" : "node-2572_3647"} data-name="Posts / five rows">
            <P31NoticePostRow className="absolute block h-[48px] left-0 top-0 w-[1280px]" date={isPage4 ? "2026.10.15" : isPage3 ? "2026.10.20" : isPage2 ? "2026.10.25" : undefined} title={isPage4 ? "仲間たちからのご挨拶" : isPage3 ? "サービスからのお便り" : isPage2 ? "新しい冒険のお知らせ" : "ドラゴンボール Zへようこそ"} />
            <P31NoticePostRow className="absolute block h-[48px] left-0 top-[56px] w-[1280px]" date={isPage4 ? "2026.10.14" : isPage3 ? "2026.10.19" : isPage2 ? "2026.10.24" : "2026.10.29"} title={isPage4 ? "亀ハウスでひと休み" : isPage3 ? "冒険の入口をご案内します" : isPage2 ? "ご利用ガイドを更新しました" : "お知らせページのご案内"} />
            <P31NoticePostRow className="absolute block h-[48px] left-0 top-[112px] w-[1280px]" date={isPage4 ? "2026.10.13" : isPage3 ? "2026.10.18" : isPage2 ? "2026.10.23" : "2026.10.28"} title={isPage4 ? "ゲーム提供会社について" : isPage3 ? "表示内容の更新について" : isPage2 ? "お問い合わせのご案内" : "定期メンテナンスのお知らせ"} />
            <P31NoticePostRow className="absolute block h-[48px] left-0 top-[168px] w-[1280px]" date={isPage4 ? "2026.10.12" : isPage3 ? "2026.10.17" : isPage2 ? "2026.10.22" : "2026.10.27"} title={isPage4 ? "お知らせの確認方法" : isPage3 ? "ご意見をお聞かせください" : isPage2 ? "ゲーム一覧の見つけ方" : "新しいゲームが仲間入り"} />
            <P31NoticePostRow className="absolute block h-[48px] left-0 top-[224px] w-[1280px]" date={isPage4 ? "2026.10.11" : isPage3 ? "2026.10.16" : isPage2 ? "2026.10.21" : "2026.10.26"} title={isPage4 ? "ドラゴンボール Zから皆さまへ" : isPage3 ? "よくあるご質問のご案内" : isPage2 ? "アカウント設定について" : "カプセル通信からのお便り"} />
          </div>
          <div className="absolute h-[36px] left-[577px] top-[304px] w-[174px]" id={isPage4 ? "node-2572_3692" : isPage3 ? "node-2572_3679" : isPage2 ? "node-2572_3666" : "node-2572_3653"} data-name="Pagination / pages 1 to 4">
            <P31PaginationButton className={`absolute left-0 size-[36px] top-0 ${["Page 2", "Page 3", "Page 4"].includes(view) ? "block cursor-pointer" : ""}`} state={view === "Page 1" ? "Selected" : undefined} />
            <P31PaginationButton className={`absolute left-[46px] size-[36px] top-0 ${isPage2 ? "" : "block cursor-pointer"}`} number="2" state={isPage2 ? "Selected" : undefined} />
            <P31PaginationButton className={`absolute left-[92px] size-[36px] top-0 ${isPage3 ? "" : "block cursor-pointer"}`} number="3" state={isPage3 ? "Selected" : undefined} />
            <P31PaginationButton className={`absolute left-[138px] size-[36px] top-0 ${isPage4 ? "" : "block cursor-pointer"}`} number="4" state={isPage4 ? "Selected" : undefined} />
          </div>
        </>
      )}
    </div>
  );
}
