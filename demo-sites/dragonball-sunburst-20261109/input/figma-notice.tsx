const imgPageGeneratedTile = "https://www.figma.com/api/mcp/asset/002059e8-8815-47af-a3b3-46b8f4e962aa.png";
const imgImageRightGeneratedPng = "https://www.figma.com/api/mcp/asset/5595f7cf-6272-4043-af5e-123affdffbd3.png";
const imgPostGeneratedNavyGoldRow = "https://www.figma.com/api/mcp/asset/4aea578b-554b-42cb-b7ed-49d31bd086fa.png";
const imgNoticeGeneratedReadingPanel = "https://www.figma.com/api/mcp/asset/d424e92f-cbc1-4d41-8317-1ea55b52f929.png";
const imgImageHomeGeneratedPng = "https://www.figma.com/api/mcp/asset/7a52d681-a07a-4f87-9c7c-9ba77a343232.png";
const imgSkinPrimaryCapsule = "https://www.figma.com/api/mcp/asset/8d777990-1484-43f8-9890-87d78795e6c6.png";
const imgImageDepositGeneratedPng = "https://www.figma.com/api/mcp/asset/3d0bdcb2-c77b-4e0b-85da-9f9568a85ec8.png";
const imgImageNoticeGeneratedPng = "https://www.figma.com/api/mcp/asset/ff7077cf-1fd1-4ca5-a014-f2cae2a61446.png";
const imgBackgroundNoticeGeneratedEnvironment = "https://www.figma.com/api/mcp/asset/04307314-467c-4b2e-b180-f913139c8564.png";
const imgTitleNoticeGeneratedPng = "https://www.figma.com/api/mcp/asset/e460935f-1f39-45a0-8cc3-8638ee8c7d88.png";
const imgBrandDragonBallZGeneratedPng = "https://www.figma.com/api/mcp/asset/059d0bb3-7d7a-4785-a656-3e08258e1423.png";
const imgNoticeCapsuleSurface = "https://www.figma.com/api/mcp/asset/ea77a4e5-3e56-4ec1-bed4-7fd973b4260a.png";
const imgImageWithdrawCleanTransparentPng = "https://www.figma.com/api/mcp/asset/f2350336-d0fe-4667-ae93-7407135a4f62.png";
const imgImageSupportGeneratedPng = "https://www.figma.com/api/mcp/asset/bd669e79-d345-4df0-9006-9adc9850c8a5.png";
const imgMenu = "https://www.figma.com/api/mcp/asset/3f674a27-779f-45b7-b0b2-8af93d52817b.png";
const imgImageLiveGeneratedPng = "https://www.figma.com/api/mcp/asset/849c4bfb-b416-40d0-806a-5554e57efc4c.png";
const imgImageSlotsGeneratedPng = "https://www.figma.com/api/mcp/asset/1bf702aa-0286-431e-8460-30551a8f2242.png";

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
  view?: "Page 1";
};

function P31NoticeBoardListsAndArticles({ className, view = "Page 1" }: P31NoticeBoardListsAndArticlesProps) {
  return (
    <div className={className || "h-[350px] relative w-[1328px]"} data-node-id="2572:3645">
      <div className="absolute h-[350px] left-0 shadow-[0px_3px_8px_0px_rgba(5,10,20,0.3)] top-0 w-[1328px]" data-node-id="2572:3646" data-name="Notice / generated reading panel">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[134.89%] left-[-1.76%] max-w-none top-[-13.06%] w-[103.52%]" src={imgNoticeGeneratedReadingPanel} />
        </div>
      </div>
      <div className="absolute cursor-pointer h-[272px] left-[24px] top-[16px] w-[1280px]" data-node-id="2572:3647" data-name="Posts / five rows">
        <P31NoticePostRow className="absolute block h-[48px] left-0 top-0 w-[1280px]" title="ドラゴンボール Zへようこそ" />
        <P31NoticePostRow className="absolute block h-[48px] left-0 top-[56px] w-[1280px]" date="2026.10.29" title="お知らせページのご案内" />
        <P31NoticePostRow className="absolute block h-[48px] left-0 top-[112px] w-[1280px]" date="2026.10.28" title="定期メンテナンスのお知らせ" />
        <P31NoticePostRow className="absolute block h-[48px] left-0 top-[168px] w-[1280px]" date="2026.10.27" title="新しいゲームが仲間入り" />
        <P31NoticePostRow className="absolute block h-[48px] left-0 top-[224px] w-[1280px]" date="2026.10.26" title="カプセル通信からのお便り" />
      </div>
      <div className="absolute h-[36px] left-[577px] top-[304px] w-[174px]" data-node-id="2572:3653" data-name="Pagination / pages 1 to 4">
        <P31PaginationButton className="absolute left-0 size-[36px] top-0" state="Selected" />
        <P31PaginationButton className="absolute block cursor-pointer left-[46px] size-[36px] top-0" number="2" />
        <P31PaginationButton className="absolute block cursor-pointer left-[92px] size-[36px] top-0" number="3" />
        <P31PaginationButton className="absolute block cursor-pointer left-[138px] size-[36px] top-0" number="4" />
      </div>
    </div>
  );
}

function P31IconHome32({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[32px]"} data-node-id="2572:2108" data-name="P31 / Icon / home / 32">
      <div className="absolute inset-[4.29%_0]" data-node-id="2572:2112" data-name="Image / home / generated PNG">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[121.28%] left-[-5.39%] max-w-none top-[-10.35%] w-[110.88%]" src={imgImageHomeGeneratedPng} />
        </div>
      </div>
    </div>
  );
}

function P31ButtonPrimaryLogin({ className }: { className?: string }) {
  return (
    <div className={className || "h-[40px] relative w-[170px]"} data-node-id="2572:2288" data-name="P31 / Button / primary login">
      <div className="absolute h-[40px] left-0 top-0 w-[170px]" data-node-id="2572:2289" data-name="Skin / primary capsule">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[106.16%] left-[-0.14%] max-w-none top-[-3.08%] w-[100.46%]" src={imgSkinPrimaryCapsule} />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:9_Black'] h-[34px] justify-center leading-[0] left-[85px] not-italic text-[#fff0b8] text-[17px] text-center text-shadow-[0px_1px_1px_rgba(0,0,0,0.8)] top-[20px] w-[170px]" data-node-id="2572:2290">
        <p className="leading-[normal]">ログイン</p>
      </div>
    </div>
  );
}

function P31IconDeposit24({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="2572:2162" data-name="P31 / Icon / deposit / 24">
      <div className="absolute inset-[0_1.7%]" data-node-id="2572:2166" data-name="Image / deposit / generated PNG">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.98%] left-[-3.95%] max-w-none top-[-3.07%] w-[107.64%]" src={imgImageDepositGeneratedPng} />
        </div>
      </div>
    </div>
  );
}

function P31IconNotice24({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="2572:2148" data-name="P31 / Icon / notice / 24">
      <div className="absolute inset-[9.4%_0]" data-node-id="2572:2152" data-name="Image / notice / generated PNG">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[133.83%] left-[-3.9%] max-w-none top-[-19.74%] w-[108.67%]" src={imgImageNoticeGeneratedPng} />
        </div>
      </div>
    </div>
  );
}

export default function Sunburst26MaxHighDragonBallZ19201080() {
  return (
    <div className="relative size-full" data-node-id="2573:3543" data-name="SUNBURST 2.6 · MAX/HIGH · DragonBall Z · お知らせ · 亀ハウスの海辺 · 1920×1080">
      <div className="absolute h-[1080px] left-0 top-0 w-[1920px]" data-node-id="2573:3544" data-name="Background / notice / generated environment">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBackgroundNoticeGeneratedEnvironment} />
      </div>
      <div className="absolute h-[94px] left-[700px] top-[495px] w-[520px]" data-node-id="2573:3545" data-name="Section title / notice">
        <div className="absolute h-[94px] left-0 top-0 w-[520px]" data-node-id="2573:3546" data-name="Title / notice / generated PNG">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[118.69%] left-[-0.46%] max-w-none top-[-8.52%] w-[100.84%]" src={imgTitleNoticeGeneratedPng} />
          </div>
        </div>
      </div>
      <div className="absolute bg-gradient-to-b from-[rgba(20,36,56,0)] h-[150px] left-0 to-[rgba(20,36,56,0.55)] top-[930px] w-[1920px]" data-node-id="2573:3547" data-name="Readability / dock horizon" />
      <div className="absolute h-[76px] left-0 top-0 w-[1920px]" data-node-id="2573:3548" data-name="Header / account and service">
        <div className="absolute bg-gradient-to-b from-[#1d334a] h-[76px] left-0 to-[#101d31] top-0 w-[1920px]" data-node-id="2573:3549" data-name="Header / navy glass" />
        <div className="absolute bg-[var(--db-ivory,#f4f0e6)] h-px left-0 top-[75px] w-[1920px]" data-node-id="2573:3550" data-name="Header / lower ivory rule" />
        <div className="absolute h-[80px] left-[40px] top-[-1px] w-[230.4px]" data-node-id="2573:3551" data-name="Brand / header">
          <div className="absolute inset-[10%_0_14%_0]" data-node-id="I2573:3551;2572:2256" data-name="Brand / DragonBall Z / generated PNG">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[128.83%] left-[-1.12%] max-w-none top-[-17.44%] w-[101.73%]" src={imgBrandDragonBallZGeneratedPng} />
            </div>
          </div>
        </div>
        <div className="absolute h-[42px] left-[330px] top-[17px] w-[560px]" data-node-id="2573:3552" data-name="Notice / capsule surface">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[361.93%] left-[-0.23%] max-w-none top-[-130.96%] w-[100.46%]" src={imgNoticeCapsuleSurface} />
          </div>
        </div>
        <P31IconNotice24 className="absolute left-[345px] size-[24px] top-[26px]" />
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[24px] justify-center leading-[0] left-[379px] not-italic text-[13px] text-[color:var(--db-orange,#ef7d32)] top-[37px] w-[40px]" data-node-id="2573:3554">
          <p className="leading-[normal]">案内</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[24px] justify-center leading-[0] left-[426px] not-italic text-[14px] text-[color:var(--db-ivory,#f4f0e6)] top-[37px] w-[444px]" data-node-id="2573:3555">
          <p className="leading-[normal]">ドラゴンボールの世界へようこそ</p>
        </div>
        <div className="absolute h-[40px] left-[918px] top-[18px] w-[124px]" data-node-id="2573:3556" data-name="Action / 入金">
          <div className="-translate-y-1/2 absolute h-[40px] left-0 right-0 top-1/2" data-node-id="I2573:3556;2572:2259" data-name="Skin / capsule">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[106.16%] left-[-0.14%] max-w-none top-[-3.08%] w-[100.46%]" src={imgSkinPrimaryCapsule} />
            </div>
          </div>
          <P31IconDeposit24 className="absolute left-[12px] size-[24px] top-[8px]" />
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[32px] justify-center leading-[0] left-[24px] not-italic right-[24px] text-[16px] text-[color:var(--db-ivory,#f4f0e6)] text-center top-1/2" data-node-id="I2573:3556;2572:2262">
            <p className="leading-[normal]">入金</p>
          </div>
        </div>
        <div className="absolute h-[40px] left-[1054px] top-[18px] w-[124px]" data-node-id="2573:3557" data-name="Action / 出金">
          <div className="-translate-y-1/2 absolute h-[40px] left-0 right-0 top-1/2" data-node-id="I2573:3557;2572:2259" data-name="Skin / capsule">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[106.16%] left-[-0.14%] max-w-none top-[-3.08%] w-[100.46%]" src={imgSkinPrimaryCapsule} />
            </div>
          </div>
          <div className="absolute left-[12px] size-[24px] top-[8px]" data-node-id="I2573:3557;2572:2261" data-name="Action / icon">
            <div className="absolute inset-[0_3.51%]" data-node-id="I2573:3557;2572:2261;2572:2180" data-name="Image / withdraw / clean transparent PNG">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[110.1%] left-[-10.48%] max-w-none top-[-5.71%] w-[118.41%]" src={imgImageWithdrawCleanTransparentPng} />
              </div>
            </div>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[32px] justify-center leading-[0] left-[24px] not-italic right-[24px] text-[16px] text-[color:var(--db-ivory,#f4f0e6)] text-center top-1/2" data-node-id="I2573:3557;2572:2262">
            <p className="leading-[normal]">出金</p>
          </div>
        </div>
        <div className="absolute h-[40px] left-[1190px] top-[18px] w-[124px]" data-node-id="2573:3558" data-name="Action / メール">
          <div className="-translate-y-1/2 absolute h-[40px] left-0 right-0 top-1/2" data-node-id="I2573:3558;2572:2259" data-name="Skin / capsule">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[106.16%] left-[-0.14%] max-w-none top-[-3.08%] w-[100.46%]" src={imgSkinPrimaryCapsule} />
            </div>
          </div>
          <div className="absolute left-[12px] size-[24px] top-[8px]" data-node-id="I2573:3558;2572:2261" data-name="Action / icon">
            <div className="absolute inset-[9.4%_0]" data-node-id="I2573:3558;2572:2261;2572:2195" data-name="Image / mail / generated PNG">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[133.83%] left-[-3.9%] max-w-none top-[-19.74%] w-[108.67%]" src={imgImageNoticeGeneratedPng} />
              </div>
            </div>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[32px] justify-center leading-[0] left-[24px] not-italic right-[24px] text-[16px] text-[color:var(--db-ivory,#f4f0e6)] text-center top-1/2" data-node-id="I2573:3558;2572:2262">
            <p className="leading-[normal]">メール</p>
          </div>
        </div>
        <div className="absolute h-[40px] left-[1326px] top-[18px] w-[124px]" data-node-id="2573:3559" data-name="Action / 問合せ">
          <div className="-translate-y-1/2 absolute h-[40px] left-0 right-0 top-1/2" data-node-id="I2573:3559;2572:2259" data-name="Skin / capsule">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[106.16%] left-[-0.14%] max-w-none top-[-3.08%] w-[100.46%]" src={imgSkinPrimaryCapsule} />
            </div>
          </div>
          <div className="absolute left-[12px] size-[24px] top-[8px]" data-node-id="I2573:3559;2572:2261" data-name="Action / icon">
            <div className="absolute inset-[4.53%_0]" data-node-id="I2573:3559;2572:2261;2572:2208" data-name="Image / support / generated PNG">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[117.97%] left-[-3.34%] max-w-none top-[-10.25%] w-[107.27%]" src={imgImageSupportGeneratedPng} />
              </div>
            </div>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[32px] justify-center leading-[0] left-[24px] not-italic right-[24px] text-[16px] text-[color:var(--db-ivory,#f4f0e6)] text-center top-1/2" data-node-id="I2573:3559;2572:2262">
            <p className="leading-[normal]">問合せ</p>
          </div>
        </div>
        <P31IconDeposit24 className="absolute left-[1478px] size-[24px] top-[27px]" />
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] h-[14px] justify-center leading-[0] left-[1512px] not-italic text-[10px] text-[color:var(--db-muted,#bcd0db)] top-[25px] w-[160px]" data-node-id="2573:3561">
          <p className="leading-[normal]">保有クレジット</p>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[22px] justify-center leading-[0] left-[1512px] not-italic text-[14px] text-[color:var(--db-ivory,#f4f0e6)] top-[46px] w-[170px]" data-node-id="2573:3562">
          <p className="leading-[normal]">ログイン後に確認</p>
        </div>
        <P31ButtonPrimaryLogin className="absolute h-[40px] left-[1715px] top-[18px] w-[170px]" />
      </div>
      <div className="absolute h-[106px] left-[176px] top-[963px] w-[1568px]" data-node-id="2573:3564" data-name="Navigation / notice selected">
        <a className="absolute block cursor-pointer h-[106px] left-0 top-0 w-[380px]" data-node-id="2573:3565" data-name="Menu / おすすめゲーム">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[105.39%] left-[-0.05%] max-w-none top-[-1.89%] w-[100.05%]" src={imgMenu} />
          </div>
          <P31IconHome32 className="absolute left-[16px] size-[48px] top-[29px]" />
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:9_Black'] h-[32px] justify-center leading-[0] left-[190px] not-italic text-[#ffeda6] text-[22px] text-center text-shadow-[0px_2px_0px_#471a04,0px_3px_3px_rgba(0,0,0,0.7)] top-[43px] w-[232px]" data-node-id="I2573:3565;2572:2299">
            <p className="leading-[normal]">おすすめゲーム</p>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] h-[18px] justify-center leading-[0] left-[190px] not-italic text-[#ffeda6] text-[10.5px] text-center top-[69px] tracking-[1px] w-[232px]" data-node-id="I2573:3565;2572:2300">
            <p className="leading-[normal]">FEATURED GAMES</p>
          </div>
        </a>
        <a className="absolute block cursor-pointer h-[106px] left-[396px] top-0 w-[380px]" data-node-id="2573:3566" data-name="Menu / ライブカジノ">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[105.39%] left-[-0.05%] max-w-none top-[-1.89%] w-[100.05%]" src={imgMenu} />
          </div>
          <div className="absolute left-[16px] size-[48px] top-[29px]" data-node-id="I2573:3566;2572:2298" data-name="Navigation / icon">
            <div className="absolute inset-[0_2.05%]" data-node-id="I2573:3566;2572:2298;2572:2127" data-name="Image / live / generated PNG">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[111.67%] left-[-8.17%] max-w-none top-[-6.23%] w-[116.43%]" src={imgImageLiveGeneratedPng} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:9_Black'] h-[32px] justify-center leading-[0] left-[190px] not-italic text-[#ffeda6] text-[22px] text-center text-shadow-[0px_2px_0px_#471a04,0px_3px_3px_rgba(0,0,0,0.7)] top-[43px] w-[232px]" data-node-id="I2573:3566;2572:2299">
            <p className="leading-[normal]">ライブカジノ</p>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] h-[18px] justify-center leading-[0] left-[190px] not-italic text-[#ffeda6] text-[10.5px] text-center top-[69px] tracking-[1px] w-[232px]" data-node-id="I2573:3566;2572:2300">
            <p className="leading-[normal]">LIVE CASINO</p>
          </div>
        </a>
        <a className="absolute block cursor-pointer h-[106px] left-[792px] top-0 w-[380px]" data-node-id="2573:3567" data-name="Menu / スロットゲーム">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[105.39%] left-[-0.05%] max-w-none top-[-1.89%] w-[100.05%]" src={imgMenu} />
          </div>
          <div className="absolute left-[16px] size-[48px] top-[29px]" data-node-id="I2573:3567;2572:2298" data-name="Navigation / icon">
            <div className="absolute inset-[2.27%_0]" data-node-id="I2573:3567;2572:2298;2572:2142" data-name="Image / slots / generated PNG">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[114.52%] left-[-6.28%] max-w-none top-[-8.49%] w-[109.33%]" src={imgImageSlotsGeneratedPng} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:9_Black'] h-[32px] justify-center leading-[0] left-[190px] not-italic text-[#ffeda6] text-[22px] text-center text-shadow-[0px_2px_0px_#471a04,0px_3px_3px_rgba(0,0,0,0.7)] top-[43px] w-[232px]" data-node-id="I2573:3567;2572:2299">
            <p className="leading-[normal]">スロットゲーム</p>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] h-[18px] justify-center leading-[0] left-[190px] not-italic text-[#ffeda6] text-[10.5px] text-center top-[69px] tracking-[1px] w-[232px]" data-node-id="I2573:3567;2572:2300">
            <p className="leading-[normal]">SLOT GAMES</p>
          </div>
        </a>
        <div className="absolute h-[106px] left-[1188px] top-0 w-[380px]" data-node-id="2573:3568" data-name="Menu / お知らせ">
          <div className="absolute inset-0 shadow-[0px_0px_12px_0px_rgba(255,115,20,0.65)]" data-node-id="I2573:3568;2572:2333" data-name="Skin / generated capsule PNG">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[105.39%] left-[-0.05%] max-w-none top-[-1.89%] w-[100.05%]" src={imgMenu} />
            </div>
          </div>
          <div className="absolute left-[16px] size-[48px] top-[29px]" data-node-id="I2573:3568;2572:2338" data-name="Navigation / icon">
            <div className="absolute inset-[9.4%_0]" data-node-id="I2573:3568;2572:2338;2572:2157" data-name="Image / notice / generated PNG">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[133.83%] left-[-3.9%] max-w-none top-[-19.74%] w-[108.67%]" src={imgImageNoticeGeneratedPng} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:9_Black'] h-[32px] justify-center leading-[0] left-[190px] not-italic text-[#ffeda6] text-[22px] text-center text-shadow-[0px_2px_0px_#471a04,0px_3px_3px_rgba(0,0,0,0.7)] top-[43px] w-[232px]" data-node-id="I2573:3568;2572:2339">
            <p className="leading-[normal]">お知らせ</p>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] h-[18px] justify-center leading-[0] left-[190px] not-italic text-[#ffeda6] text-[10.5px] text-center top-[69px] tracking-[1px] w-[232px]" data-node-id="I2573:3568;2572:2340">
            <p className="leading-[normal]">NOTICE</p>
          </div>
        </div>
      </div>
      <P31NoticeBoardListsAndArticles className="absolute h-[350px] left-[296px] top-[598px] w-[1328px]" />
    </div>
  );
}
