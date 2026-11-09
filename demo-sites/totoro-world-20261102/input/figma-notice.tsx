const imgSourceIconArrow = "https://www.figma.com/api/mcp/asset/b59b4679-50ca-4c86-80a6-0ba160653717.png";
const imgSourceIconWallet = "https://www.figma.com/api/mcp/asset/563e055b-85dd-4e16-932a-bd37de106611.png";
const imgSourceIconLetter = "https://www.figma.com/api/mcp/asset/006dbef4-d1ed-441f-8bc9-26f7fd3b5c35.png";
const imgBackgroundNewlyGeneratedCleanAnimationMoonlitCatbus = "https://www.figma.com/api/mcp/asset/ff78c183-f966-4995-af5e-22478c55ad0b.png";
const imgSourceHeaderLogo = "https://www.figma.com/api/mcp/asset/bf2c8684-9215-482f-8eba-f1caf664a406.png";
const imgSourceSliceWoodButton = "https://www.figma.com/api/mcp/asset/c52045db-7970-4543-8303-90cd8babb152.png";
const imgSourceIconSupport = "https://www.figma.com/api/mcp/asset/f1b9e99a-e65b-435a-9b5e-5e782db48a31.png";
const imgSourceSliceWoodButton1 = "https://www.figma.com/api/mcp/asset/1d0d1e78-7141-409f-81df-ae87ea728895.png";
const imgTitleGeneratedForestCrest = "https://www.figma.com/api/mcp/asset/14604531-b861-4cac-9588-dcd93702e442.png";
const imgSourceSliceWoodButton2 = "https://www.figma.com/api/mcp/asset/375c4e96-30ea-47af-b695-d7afb8fbb09a.png";
const imgSourceIconFeatured = "https://www.figma.com/api/mcp/asset/744e336e-8746-4d3f-ad4c-9d655d9447db.png";
const imgSourceIconLive = "https://www.figma.com/api/mcp/asset/6971b7c8-1a64-4963-9e38-3c531065f769.png";
const imgSourceIconSlots = "https://www.figma.com/api/mcp/asset/7af1d3f4-af65-4ff2-8756-c7123219c214.png";
const imgSelectedWarmLight = "https://www.figma.com/api/mcp/asset/36fbeef1-4a0c-4ac5-8671-64d74715a3d2.svg";

function P29NoticeBackToList({ className }: { className?: string }) {
  return (
    <div className={className || "bg-gradient-to-b border border-[var(--color\\/gold,#dbbe79)] border-solid from-[var(--color\\/forest,#163b2e)] h-[40px] relative rounded-[20px] to-[var(--color\\/deep,#071b16)] w-[124px]"} data-node-id="1889:1462" data-name="P29 / Notice / Back to list">
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] h-[28px] justify-center leading-[0] left-[61px] not-italic text-[17px] text-[color:var(--color\/cream,#fff2cf)] text-center top-[19px] w-[124px]" data-node-id="1889:1463">
        <p className="leading-[28px] whitespace-pre-wrap">{`‹  戻る`}</p>
      </div>
    </div>
  );
}

type P29NoticePaginationProps = {
  className?: string;
  number?: string;
  state?: "Default" | "Selected";
};

function P29NoticePagination({ className, number = "1", state = "Default" }: P29NoticePaginationProps) {
  const isSelected = state === "Selected";
  return (
    <div className={className || `bg-gradient-to-b border border-solid relative rounded-[10px] size-[36px] ${isSelected ? String.raw`border-[var(--color\/cream,#fff2cf)] from-[var(--color\/cream,#fff2cf)] to-[var(--color\/gold,#dbbe79)]` : String.raw`border-[var(--color\/gold,#dbbe79)] from-[var(--color\/forest,rgba(22,59,46,0.98))] to-[var(--color\/deep,rgba(7,27,22,0.98))]`}`} id={isSelected ? "node-1889_1458" : "node-1889_1454"}>
      {state === "Default" && (
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[26px] justify-center leading-[0] left-[17px] not-italic text-[16px] text-[color:var(--color\/cream,#fff2cf)] text-center top-[17px] w-[36px]" data-node-id="1889:1455">
          <p className="leading-[26px]">{number}</p>
        </div>
      )}
      {isSelected && (
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] h-[26px] justify-center leading-[0] left-[17px] not-italic text-[16px] text-[color:var(--color\/ink,#173c2d)] text-center top-[17px] w-[36px]" data-node-id="1889:1459">
          <p className="leading-[26px]">{number}</p>
        </div>
      )}
    </div>
  );
}

function P29IconsIconArrow({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[64px]"} data-node-id="1727:617" data-name="P29 / Icons / icon-arrow">
      <div className="absolute inset-0 overflow-clip" data-node-id="1727:618" data-name="Image / icon-arrow">
        <div className="absolute inset-[-13.22%_-18.15%_-16.47%_-24.21%]" data-node-id="1727:619" data-name="Source / icon-arrow">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSourceIconArrow} />
        </div>
      </div>
    </div>
  );
}

type P29NoticePostRowProps = {
  className?: string;
  date?: string;
  state?: "Default";
  title?: string;
};

function P29NoticePostRow({ className, date = "2026.10.30", state = "Default", title = "トトロワールドへようこそ" }: P29NoticePostRowProps) {
  return (
    <div className={className || "border border-[var(--color\\/gold,#dbbe79)] border-solid drop-shadow-[0px_3px_4px_rgba(0,5,6,0.25)] h-[48px] relative rounded-[11px] w-[1280px]"} data-node-id="1889:1440">
      <div aria-hidden className="absolute bg-gradient-to-b from-[var(--color\/forest,rgba(22,59,46,0.94))] inset-0 pointer-events-none rounded-[11px] to-[var(--color\/deep,rgba(7,27,22,0.94))]" />
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] h-[26px] justify-center leading-[0] left-[23px] not-italic text-[18px] text-[color:var(--color\/cream,#fff2cf)] top-[23px] w-[1000px]" data-node-id="1889:1441">
        <p className="leading-[26px]">{title}</p>
      </div>
      <div className="-translate-x-full -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:6_SemiBold'] h-[22px] justify-center leading-[0] left-[1201px] not-italic text-[16px] text-[color:var(--color\/muted,#c6cfb6)] text-right top-[23px] w-[140px]" data-node-id="1889:1442">
        <p className="leading-[22px]">{date}</p>
      </div>
      <P29IconsIconArrow className="absolute flex items-center justify-center left-[1225px] size-[22px] top-[12px]" />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(232,235,176,0.1)]" />
    </div>
  );
}

type P29NoticeBoardPagesAndArticlesProps = {
  className?: string;
  view?: "Page 1";
};

function P29NoticeBoardPagesAndArticles({ className, view = "Page 1" }: P29NoticeBoardPagesAndArticlesProps) {
  return (
    <div className={className || "backdrop-blur-[6px] bg-[var(--color\\/deep,#071b16)] border border-[var(--color\\/gold,#dbbe79)] border-solid h-[350px] relative rounded-[18px] w-[1328px]"} data-node-id="1892:1444">
      <div className="absolute h-px left-[-1px] top-[-1px] w-[1328px]" data-node-id="1892:1445" style={{ backgroundImage: "linear-gradient(90deg, rgba(219, 190, 121, 0) 0%, rgba(219, 190, 121, 0.6) 22%, rgba(219, 190, 121, 0.6) 78%, rgba(219, 190, 121, 0) 100%)" }} data-name="Panel / fading moon-gold line" />
      <div className="absolute h-px left-[-1px] top-[348px] w-[1328px]" data-node-id="1892:1446" style={{ backgroundImage: "linear-gradient(90deg, rgba(219, 190, 121, 0) 0%, rgba(219, 190, 121, 0.6) 22%, rgba(219, 190, 121, 0.6) 78%, rgba(219, 190, 121, 0) 100%)" }} data-name="Panel / fading moon-gold line" />
      <div className="absolute content-stretch cursor-pointer flex flex-col gap-[8px] h-[272px] items-start left-[23px] top-[15px] w-[1280px]" data-node-id="1892:1447" data-name="Posts / five rows">
        <P29NoticePostRow className="block border border-[var(--color\/gold,#dbbe79)] border-solid drop-shadow-[0px_3px_4px_rgba(0,5,6,0.25)] h-[48px] relative rounded-[11px] shrink-0 w-[1280px]" />
        <P29NoticePostRow className="block border border-[var(--color\/gold,#dbbe79)] border-solid drop-shadow-[0px_3px_4px_rgba(0,5,6,0.25)] h-[48px] relative rounded-[11px] shrink-0 w-[1280px]" date="2026.10.29" title="お知らせページのご案内" />
        <P29NoticePostRow className="block border border-[var(--color\/gold,#dbbe79)] border-solid drop-shadow-[0px_3px_4px_rgba(0,5,6,0.25)] h-[48px] relative rounded-[11px] shrink-0 w-[1280px]" date="2026.10.28" title="定期メンテナンスのお知らせ" />
        <P29NoticePostRow className="block border border-[var(--color\/gold,#dbbe79)] border-solid drop-shadow-[0px_3px_4px_rgba(0,5,6,0.25)] h-[48px] relative rounded-[11px] shrink-0 w-[1280px]" date="2026.10.27" title="新しいゲームが仲間入り" />
        <P29NoticePostRow className="block border border-[var(--color\/gold,#dbbe79)] border-solid drop-shadow-[0px_3px_4px_rgba(0,5,6,0.25)] h-[48px] relative rounded-[11px] shrink-0 w-[1280px]" date="2026.10.26" title="月あかりの森からのお便り" />
      </div>
      <div className="absolute content-stretch flex gap-[10px] items-start left-[576px] overflow-clip top-[303px]" data-node-id="1892:1478" data-name="Pagination / pages 1 to 4">
        <P29NoticePagination className="bg-gradient-to-b border border-[var(--color\/cream,#fff2cf)] border-solid from-[var(--color\/cream,#fff2cf)] relative rounded-[10px] shrink-0 size-[36px] to-[var(--color\/gold,#dbbe79)]" state="Selected" />
        <P29NoticePagination className="bg-gradient-to-b block border border-[var(--color\/gold,#dbbe79)] border-solid cursor-pointer from-[var(--color\/forest,rgba(22,59,46,0.98))] relative rounded-[10px] shrink-0 size-[36px] to-[var(--color\/deep,rgba(7,27,22,0.98))]" number="2" />
        <P29NoticePagination className="bg-gradient-to-b block border border-[var(--color\/gold,#dbbe79)] border-solid cursor-pointer from-[var(--color\/forest,rgba(22,59,46,0.98))] relative rounded-[10px] shrink-0 size-[36px] to-[var(--color\/deep,rgba(7,27,22,0.98))]" number="3" />
        <P29NoticePagination className="bg-gradient-to-b block border border-[var(--color\/gold,#dbbe79)] border-solid cursor-pointer from-[var(--color\/forest,rgba(22,59,46,0.98))] relative rounded-[10px] shrink-0 size-[36px] to-[var(--color\/deep,rgba(7,27,22,0.98))]" number="4" />
      </div>
    </div>
  );
}

function P29IconsIconWallet({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[64px]"} data-node-id="1727:611" data-name="P29 / Icons / icon-wallet">
      <div className="absolute inset-0 overflow-clip" data-node-id="1727:612" data-name="Image / icon-wallet">
        <div className="absolute inset-[-8.18%_-6.77%_-9.68%_-11.09%]" data-node-id="1727:613" data-name="Source / icon-wallet">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSourceIconWallet} />
        </div>
      </div>
    </div>
  );
}

function P29IconsIconLetter({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[64px]"} data-node-id="1727:608" data-name="P29 / Icons / icon-letter">
      <div className="absolute inset-0 overflow-clip" data-node-id="1727:609" data-name="Image / icon-letter">
        <div className="absolute inset-[0.3%_-4.96%_-2.78%_-7.18%]" data-node-id="1727:610" data-name="Source / icon-letter">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSourceIconLetter} />
        </div>
      </div>
    </div>
  );
}

export default function TotoroWorld19201080() {
  return (
    <div className="bg-[#060f1f] relative size-full" data-node-id="1888:1343" data-name="TOTORO WORLD · お知らせ · 月夜のネコバス · 1920×1080">
      <div className="absolute h-[1080px] left-0 top-0 w-[1920px]" data-node-id="1888:1344" data-name="Background / newly generated clean-animation moonlit Catbus">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBackgroundNewlyGeneratedCleanAnimationMoonlitCatbus} />
      </div>
      <div className="absolute bg-gradient-to-b from-[rgba(4,10,17,0.92)] h-[76px] left-0 to-[rgba(4,14,22,0.6)] top-0 w-[1920px]" data-node-id="1888:1345" data-name="Header / original account and service">
        <div className="absolute h-[52px] left-[42px] overflow-clip top-[12px] w-[260px]" data-node-id="1888:1346" data-name="Image / Compact TOTORO WORLD wordmark">
          <div className="absolute h-[87.068px] left-[-1.08px] top-[-18.01px] w-[261.203px]" data-node-id="1888:1347" data-name="Source / header-logo">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSourceHeaderLogo} />
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[var(--space\/8,8px)] h-[44px] items-start left-[916px] top-[16px] w-[528px]" data-node-id="1888:1348" data-name="Services / horizontal actions">
          <div className="content-stretch flex gap-[6px] h-[44px] items-center justify-center relative shrink-0 w-[126px]" data-node-id="1888:1349" data-name="Service / 충전">
            <div className="absolute h-[44px] left-[23.45px] overflow-clip top-0 w-[79.091px]" data-node-id="I1888:1349;1729:653" data-name="Button skin slice / 1">
              <div className="absolute h-[44px] left-0 top-0 w-[79.091px]" data-node-id="I1888:1349;1729:654" data-name="Source slice / wood-button">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[204.13%] left-[-10.91%] max-w-none top-[-50.96%] w-[121.82%]" src={imgSourceSliceWoodButton} />
                </div>
              </div>
            </div>
            <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="I1888:1349;1729:651" data-name="Button skin slice / 0">
              <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="I1888:1349;1729:652" data-name="Source slice / wood-button">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[204.13%] left-[-11.43%] max-w-none top-[-50.96%] w-[1010%]" src={imgSourceSliceWoodButton} />
                </div>
              </div>
              <div className="-translate-y-1/2 absolute left-[5px] size-[34px] top-1/2" data-node-id="I1888:1349;1729:657" data-name="Action / icon">
                <div className="absolute inset-0 overflow-clip" data-node-id="I1888:1349;1729:657;1727:612" data-name="Image / icon-wallet">
                  <div className="absolute inset-[-8.18%_-6.77%_-9.68%_-11.09%]" data-node-id="I1888:1349;1729:657;1727:613" data-name="Source / icon-wallet">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSourceIconWallet} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute h-[44px] left-[100.55px] overflow-clip top-0 w-[25.455px]" data-node-id="I1888:1349;1729:655" data-name="Button skin slice / 2">
              <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="I1888:1349;1729:656" data-name="Source slice / wood-button">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[204.13%] left-[-898.57%] max-w-none top-[-50.96%] w-[1010%]" src={imgSourceSliceWoodButton} />
                </div>
              </div>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[calc(50%+5px)] overflow-clip pt-[4px] top-[calc(50%-2px)] w-[56px]" data-node-id="I1888:1349;1744:1011" data-name="Content / labels">
              <p className="[word-break:break-word] font-['Paperlogy:8_ExtraBold'] leading-[1.4] not-italic relative shrink-0 text-[18px] text-[color:var(--color\/cream,#fff2cf)] text-center whitespace-nowrap" data-node-id="I1888:1349;1729:660">
                入金
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[6px] h-[44px] items-center justify-center relative shrink-0 w-[126px]" data-node-id="1888:1350" data-name="Service / 환전">
            <div className="absolute h-[44px] left-[23.45px] overflow-clip top-0 w-[79.091px]" data-node-id="I1888:1350;1729:653" data-name="Button skin slice / 1">
              <div className="absolute h-[44px] left-0 top-0 w-[79.091px]" data-node-id="I1888:1350;1729:654" data-name="Source slice / wood-button">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[204.13%] left-[-10.91%] max-w-none top-[-50.96%] w-[121.82%]" src={imgSourceSliceWoodButton} />
                </div>
              </div>
            </div>
            <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="I1888:1350;1729:651" data-name="Button skin slice / 0">
              <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="I1888:1350;1729:652" data-name="Source slice / wood-button">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[204.13%] left-[-11.43%] max-w-none top-[-50.96%] w-[1010%]" src={imgSourceSliceWoodButton} />
                </div>
              </div>
              <div className="-translate-y-1/2 absolute left-[5px] size-[34px] top-1/2" data-node-id="I1888:1350;1729:657" data-name="Action / icon">
                <div className="absolute inset-0 overflow-clip" data-node-id="I1888:1350;1729:657;1727:612" data-name="Image / icon-wallet">
                  <div className="absolute inset-[-8.18%_-6.77%_-9.68%_-11.09%]" data-node-id="I1888:1350;1729:657;1727:613" data-name="Source / icon-wallet">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSourceIconWallet} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute h-[44px] left-[100.55px] overflow-clip top-0 w-[25.455px]" data-node-id="I1888:1350;1729:655" data-name="Button skin slice / 2">
              <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="I1888:1350;1729:656" data-name="Source slice / wood-button">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[204.13%] left-[-898.57%] max-w-none top-[-50.96%] w-[1010%]" src={imgSourceSliceWoodButton} />
                </div>
              </div>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[calc(50%+5px)] overflow-clip pt-[4px] top-[calc(50%-2px)] w-[56px]" data-node-id="I1888:1350;1744:1011" data-name="Content / labels">
              <p className="[word-break:break-word] font-['Paperlogy:8_ExtraBold'] leading-[1.4] not-italic relative shrink-0 text-[18px] text-[color:var(--color\/cream,#fff2cf)] text-center whitespace-nowrap" data-node-id="I1888:1350;1729:660">
                出金
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[6px] h-[44px] items-center justify-center relative shrink-0 w-[126px]" data-node-id="1888:1351" data-name="Service / 쪽지">
            <div className="absolute h-[44px] left-[23.45px] overflow-clip top-0 w-[79.091px]" data-node-id="I1888:1351;1729:653" data-name="Button skin slice / 1">
              <div className="absolute h-[44px] left-0 top-0 w-[79.091px]" data-node-id="I1888:1351;1729:654" data-name="Source slice / wood-button">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[204.13%] left-[-10.91%] max-w-none top-[-50.96%] w-[121.82%]" src={imgSourceSliceWoodButton} />
                </div>
              </div>
            </div>
            <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="I1888:1351;1729:651" data-name="Button skin slice / 0">
              <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="I1888:1351;1729:652" data-name="Source slice / wood-button">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[204.13%] left-[-11.43%] max-w-none top-[-50.96%] w-[1010%]" src={imgSourceSliceWoodButton} />
                </div>
              </div>
              <div className="-translate-y-1/2 absolute left-[5px] size-[34px] top-1/2" data-node-id="I1888:1351;1729:657" data-name="Action / icon">
                <div className="absolute inset-0 overflow-clip" data-node-id="I1888:1351;1729:657;1727:609" data-name="Image / icon-letter">
                  <div className="absolute inset-[0.3%_-4.96%_-2.78%_-7.18%]" data-node-id="I1888:1351;1729:657;1727:610" data-name="Source / icon-letter">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSourceIconLetter} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute h-[44px] left-[100.55px] overflow-clip top-0 w-[25.455px]" data-node-id="I1888:1351;1729:655" data-name="Button skin slice / 2">
              <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="I1888:1351;1729:656" data-name="Source slice / wood-button">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[204.13%] left-[-898.57%] max-w-none top-[-50.96%] w-[1010%]" src={imgSourceSliceWoodButton} />
                </div>
              </div>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[calc(50%+5px)] overflow-clip pt-[4px] top-[calc(50%-2px)] w-[56px]" data-node-id="I1888:1351;1744:1011" data-name="Content / labels">
              <p className="[word-break:break-word] font-['Paperlogy:8_ExtraBold'] leading-[1.4] not-italic relative shrink-0 text-[18px] text-[color:var(--color\/cream,#fff2cf)] text-center whitespace-nowrap" data-node-id="I1888:1351;1729:660">
                メール
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[6px] h-[44px] items-center justify-center relative shrink-0 w-[126px]" data-node-id="1888:1352" data-name="Service / 문의">
            <div className="absolute h-[44px] left-[23.45px] overflow-clip top-0 w-[79.091px]" data-node-id="I1888:1352;1729:653" data-name="Button skin slice / 1">
              <div className="absolute h-[44px] left-0 top-0 w-[79.091px]" data-node-id="I1888:1352;1729:654" data-name="Source slice / wood-button">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[204.13%] left-[-10.91%] max-w-none top-[-50.96%] w-[121.82%]" src={imgSourceSliceWoodButton} />
                </div>
              </div>
            </div>
            <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="I1888:1352;1729:651" data-name="Button skin slice / 0">
              <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="I1888:1352;1729:652" data-name="Source slice / wood-button">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[204.13%] left-[-11.43%] max-w-none top-[-50.96%] w-[1010%]" src={imgSourceSliceWoodButton} />
                </div>
              </div>
              <div className="-translate-y-1/2 absolute left-[5px] size-[34px] top-1/2" data-node-id="I1888:1352;1729:657" data-name="Action / icon">
                <div className="absolute inset-0 overflow-clip" data-node-id="I1888:1352;1729:657;1727:615" data-name="Image / icon-support">
                  <div className="absolute inset-[-5.8%_-4.19%_-3.62%_-5.24%]" data-node-id="I1888:1352;1729:657;1727:616" data-name="Source / icon-support">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSourceIconSupport} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute h-[44px] left-[100.55px] overflow-clip top-0 w-[25.455px]" data-node-id="I1888:1352;1729:655" data-name="Button skin slice / 2">
              <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="I1888:1352;1729:656" data-name="Source slice / wood-button">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[204.13%] left-[-898.57%] max-w-none top-[-50.96%] w-[1010%]" src={imgSourceSliceWoodButton} />
                </div>
              </div>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[calc(50%+5px)] overflow-clip pt-[4px] top-[calc(50%-2px)] w-[56px]" data-node-id="I1888:1352;1744:1011" data-name="Content / labels">
              <p className="[word-break:break-word] font-['Paperlogy:8_ExtraBold'] leading-[1.4] not-italic relative shrink-0 text-[18px] text-[color:var(--color\/cream,#fff2cf)] text-center whitespace-nowrap" data-node-id="I1888:1352;1729:660">
                問合せ
              </p>
            </div>
          </div>
        </div>
        <div className="absolute h-[42px] left-[330px] top-[17px] w-[560px]" data-node-id="1888:1353" data-name="Notice / woodland ticker">
          <div className="absolute h-[42px] left-[22.92px] overflow-clip top-0 w-[514.169px]" data-node-id="1888:1356" data-name="Button skin slice / 1">
            <div className="absolute h-[42px] left-0 top-0 w-[514.169px]" data-node-id="1888:1357" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[613.56%] left-[-4.37%] max-w-none top-[-256.78%] w-[108.73%]" src={imgSourceSliceWoodButton1} />
              </div>
            </div>
          </div>
          <div className="absolute h-[42px] left-0 overflow-clip top-0 w-[24.915px]" data-node-id="1888:1354" data-name="Button skin slice / 0">
            <div className="absolute h-[42px] left-0 top-0 w-[24.915px]" data-node-id="1888:1355" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[613.56%] left-[-35.71%] max-w-none top-[-256.78%] w-[3102.86%]" src={imgSourceSliceWoodButton1} />
              </div>
            </div>
          </div>
          <div className="absolute h-[42px] left-[535.08px] overflow-clip top-0 w-[24.915px]" data-node-id="1888:1358" data-name="Button skin slice / 2">
            <div className="absolute h-[42px] left-0 top-0 w-[24.915px]" data-node-id="1888:1359" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[613.56%] left-[-2967.14%] max-w-none top-[-256.78%] w-[3102.86%]" src={imgSourceSliceWoodButton1} />
              </div>
            </div>
          </div>
          <P29IconsIconLetter className="absolute left-[12px] size-[27px] top-[8px]" />
          <p className="[word-break:break-word] absolute font-['Paperlogy:7_Bold'] leading-[1.4] left-[50px] not-italic text-[14px] text-[color:var(--color\/gold,#dbbe79)] top-[12px] w-[34px]" data-node-id="1888:1361">
            案内
          </p>
          <p className="[word-break:break-word] absolute font-['Paperlogy:5_Medium'] leading-[1.4] left-[84px] not-italic text-[13.5px] text-[color:var(--color\/cream,#fff2cf)] top-[12px] w-[414px]" data-node-id="1888:1362">
            トトロワールドへようこそ
          </p>
        </div>
        <div className="absolute h-[44px] left-[1466px] top-[16px] w-[218px]" data-node-id="1888:1363" data-name="Account / guest credits">
          <P29IconsIconWallet className="absolute left-0 size-[30px] top-[7px]" />
          <p className="[word-break:break-word] absolute font-['Paperlogy:5_Medium'] leading-[1.4] left-[40px] not-italic text-[11px] text-[color:var(--color\/muted,#c6cfb6)] top-[2px] w-[164px]" data-node-id="1888:1365">
            保有クレジット
          </p>
          <p className="[word-break:break-word] absolute font-['Paperlogy:7_Bold'] leading-[1.4] left-[40px] not-italic text-[14px] text-[color:var(--color\/cream,#fff2cf)] top-[20px] w-[164px]" data-node-id="1888:1366">
            ログイン後に確認
          </p>
        </div>
        <div className="absolute h-[44px] left-[1712px] top-[16px] w-[172px]" data-node-id="1888:1367" data-name="Entry / login button">
          <div className="absolute h-[44px] left-[23.45px] overflow-clip top-0 w-[125.091px]" data-node-id="1888:1370" data-name="Button skin slice / 1">
            <div className="absolute h-[44px] left-0 top-0 w-[125.091px]" data-node-id="1888:1371" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[204.13%] left-[-12.1%] max-w-none top-[-50.96%] w-[124.21%]" src={imgSourceSliceWoodButton} />
              </div>
            </div>
          </div>
          <div className="absolute h-[44px] left-0 overflow-clip top-0 w-[25.455px]" data-node-id="1888:1368" data-name="Button skin slice / 0">
            <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="1888:1369" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[204.13%] left-[-11.43%] max-w-none top-[-50.96%] w-[1010%]" src={imgSourceSliceWoodButton} />
              </div>
            </div>
          </div>
          <div className="absolute h-[44px] left-[146.55px] overflow-clip top-0 w-[25.455px]" data-node-id="1888:1372" data-name="Button skin slice / 2">
            <div className="absolute h-[44px] left-0 top-0 w-[25.455px]" data-node-id="1888:1373" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[204.13%] left-[-898.57%] max-w-none top-[-50.96%] w-[1010%]" src={imgSourceSliceWoodButton} />
              </div>
            </div>
          </div>
          <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Paperlogy:7_Bold'] leading-[1.4] left-[89px] not-italic text-[19px] text-[color:var(--color\/cream,#fff2cf)] text-center top-[9px] w-[120px]" data-node-id="1888:1374">
            ログイン
          </p>
        </div>
      </div>
      <div className="absolute h-[93.202px] left-[700px] top-[495px] w-[520px]" data-node-id="1888:1423" data-name="Section title / お知らせ">
        <div className="absolute h-[93.202px] left-0 top-0 w-[520px]" data-node-id="1888:1432" data-name="Title / generated forest crest">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[189.03%] left-[-0.89%] max-w-none top-[-40.21%] w-[101.64%]" src={imgTitleGeneratedForestCrest} />
          </div>
        </div>
        <p className="-translate-x-1/2 [word-break:break-word] absolute bg-clip-text font-['Paperlogy:9_Black'] leading-[1.1] left-1/2 not-italic text-[26px] text-[transparent] text-center text-shadow-[0px_0.634px_0px_#693d0e,0px_1.585px_0px_#2e1604,0px_2.537px_1.902px_rgba(1,6,5,0.92)] top-[calc(50%-5.03px)] tracking-[0.52px] whitespace-nowrap" data-node-id="1888:1433" style={{ backgroundImage: "linear-gradient(180deg, rgb(255, 251, 219) 0%, rgb(255, 232, 150) 24%, rgb(204, 145, 51) 48%, rgb(255, 245, 184) 51%, rgb(245, 199, 87) 64%, rgb(171, 102, 26) 100%)" }}>
          お知らせ
        </p>
      </div>
      <div className="absolute bg-gradient-to-b from-[rgba(3,10,6,0)] h-[150px] left-0 to-[rgba(3,10,6,0.94)] top-[930px] w-[1920px]" data-node-id="1888:1434" data-name="Readability / dock horizon shade" />
      <div className="absolute content-stretch flex gap-[var(--space\/16,16px)] h-[106px] items-center left-[176px] top-[963px] w-[1568px]" data-node-id="1888:1435" data-name="Navigation / notice selected">
        <a className="content-stretch cursor-pointer flex gap-[12px] h-[106px] items-center relative shrink-0 w-[380px]" data-node-id="1888:1436" data-name="Menu / 추천게임">
          <div className="absolute h-[106px] left-[89.6px] overflow-clip top-0 w-[200.79px]" data-node-id="I1888:1436;1728:602" data-name="Button skin slice / 1">
            <div className="absolute h-[106px] left-0 top-0 w-[200.79px]" data-node-id="I1888:1436;1728:603" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[148.97%] left-[-31.47%] max-w-none top-[-25.51%] w-[162.87%]" src={imgSourceSliceWoodButton2} />
              </div>
            </div>
          </div>
          <div className="absolute h-[106px] left-0 overflow-clip top-0 w-[91.605px]" data-node-id="I1888:1436;1728:600" data-name="Button skin slice / 0">
            <div className="absolute h-[106px] left-0 top-0 w-[91.605px]" data-node-id="I1888:1436;1728:601" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[148.97%] left-[-3.1%] max-w-none top-[-25.51%] w-[517.14%]" src={imgSourceSliceWoodButton2} />
              </div>
            </div>
          </div>
          <div className="-translate-y-1/2 absolute left-[52px] size-[64px] top-1/2" data-node-id="I1888:1436;1728:606" data-name="Navigation / icon">
            <div className="absolute inset-0 overflow-clip" data-node-id="I1888:1436;1728:606;1727:600" data-name="Image / icon-featured">
              <div className="absolute inset-[-0.87%_-2.07%_0.37%_-5.05%]" data-node-id="I1888:1436;1728:606;1727:601" data-name="Source / icon-featured">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSourceIconFeatured} />
              </div>
            </div>
          </div>
          <div className="absolute h-[106px] left-[288.4px] overflow-clip top-0 w-[91.605px]" data-node-id="I1888:1436;1728:604" data-name="Button skin slice / 2">
            <div className="absolute h-[106px] left-0 top-0 w-[91.605px]" data-node-id="I1888:1436;1728:605" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[148.97%] left-[-414.29%] max-w-none top-[-25.51%] w-[517.14%]" src={imgSourceSliceWoodButton2} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col items-center justify-center leading-[1.4] left-1/2 not-italic overflow-clip text-center top-[calc(50%+6px)] w-[212px] whitespace-nowrap" data-node-id="I1888:1436;1744:1008" data-name="Content / labels">
            <p className="bg-clip-text font-['Paperlogy:7_Bold'] mb-[-2px] relative shrink-0 text-[21px] text-[transparent] text-shadow-[0px_0.7px_0px_#6b400f,0px_1.5px_0px_#291405,0px_2.2px_1.3px_rgba(1,6,5,0.9)]" data-node-id="I1888:1436;1728:609" style={{ backgroundImage: "linear-gradient(180deg, rgb(255, 252, 224) 0%, rgb(255, 235, 161) 30%, rgb(207, 150, 64) 49%, rgb(255, 247, 196) 52%, rgb(222, 171, 82) 100%)" }}>
              おすすめゲーム
            </p>
            <p className="font-['Paperlogy:5_Medium'] relative shrink-0 text-[#ebd9a6] text-[10.5px] tracking-[0.9px]" data-node-id="I1888:1436;1728:610">
              FEATURED GAMES
            </p>
          </div>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[12px] h-[106px] items-center relative shrink-0 w-[380px]" data-node-id="1888:1437" data-name="Menu / 라이브카지노">
          <div className="absolute h-[106px] left-[89.6px] overflow-clip top-0 w-[200.79px]" data-node-id="I1888:1437;1728:602" data-name="Button skin slice / 1">
            <div className="absolute h-[106px] left-0 top-0 w-[200.79px]" data-node-id="I1888:1437;1728:603" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[148.97%] left-[-31.47%] max-w-none top-[-25.51%] w-[162.87%]" src={imgSourceSliceWoodButton2} />
              </div>
            </div>
          </div>
          <div className="absolute h-[106px] left-0 overflow-clip top-0 w-[91.605px]" data-node-id="I1888:1437;1728:600" data-name="Button skin slice / 0">
            <div className="absolute h-[106px] left-0 top-0 w-[91.605px]" data-node-id="I1888:1437;1728:601" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[148.97%] left-[-3.1%] max-w-none top-[-25.51%] w-[517.14%]" src={imgSourceSliceWoodButton2} />
              </div>
            </div>
          </div>
          <div className="-translate-y-1/2 absolute left-[52px] size-[64px] top-1/2" data-node-id="I1888:1437;1728:606" data-name="Navigation / icon">
            <div className="absolute inset-0 overflow-clip" data-node-id="I1888:1437;1728:606;1727:603" data-name="Image / icon-live">
              <div className="absolute inset-[2.12%_-5.48%_1.37%_-6.8%]" data-node-id="I1888:1437;1728:606;1727:604" data-name="Source / icon-live">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSourceIconLive} />
              </div>
            </div>
          </div>
          <div className="absolute h-[106px] left-[288.4px] overflow-clip top-0 w-[91.605px]" data-node-id="I1888:1437;1728:604" data-name="Button skin slice / 2">
            <div className="absolute h-[106px] left-0 top-0 w-[91.605px]" data-node-id="I1888:1437;1728:605" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[148.97%] left-[-414.29%] max-w-none top-[-25.51%] w-[517.14%]" src={imgSourceSliceWoodButton2} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col items-center justify-center leading-[1.4] left-1/2 not-italic overflow-clip text-center top-[calc(50%+6px)] w-[212px] whitespace-nowrap" data-node-id="I1888:1437;1744:1008" data-name="Content / labels">
            <p className="bg-clip-text font-['Paperlogy:7_Bold'] mb-[-2px] relative shrink-0 text-[21px] text-[transparent] text-shadow-[0px_0.7px_0px_#6b400f,0px_1.5px_0px_#291405,0px_2.2px_1.3px_rgba(1,6,5,0.9)]" data-node-id="I1888:1437;1728:609" style={{ backgroundImage: "linear-gradient(180deg, rgb(255, 252, 224) 0%, rgb(255, 235, 161) 30%, rgb(207, 150, 64) 49%, rgb(255, 247, 196) 52%, rgb(222, 171, 82) 100%)" }}>
              ライブカジノ
            </p>
            <p className="font-['Paperlogy:5_Medium'] relative shrink-0 text-[#ebd9a6] text-[10.5px] tracking-[0.9px]" data-node-id="I1888:1437;1728:610">
              LIVE CASINO
            </p>
          </div>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[12px] h-[106px] items-center relative shrink-0 w-[380px]" data-node-id="1888:1438" data-name="Menu / 슬롯게임">
          <div className="absolute h-[106px] left-[89.6px] overflow-clip top-0 w-[200.79px]" data-node-id="I1888:1438;1728:602" data-name="Button skin slice / 1">
            <div className="absolute h-[106px] left-0 top-0 w-[200.79px]" data-node-id="I1888:1438;1728:603" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[148.97%] left-[-31.47%] max-w-none top-[-25.51%] w-[162.87%]" src={imgSourceSliceWoodButton2} />
              </div>
            </div>
          </div>
          <div className="absolute h-[106px] left-0 overflow-clip top-0 w-[91.605px]" data-node-id="I1888:1438;1728:600" data-name="Button skin slice / 0">
            <div className="absolute h-[106px] left-0 top-0 w-[91.605px]" data-node-id="I1888:1438;1728:601" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[148.97%] left-[-3.1%] max-w-none top-[-25.51%] w-[517.14%]" src={imgSourceSliceWoodButton2} />
              </div>
            </div>
          </div>
          <div className="-translate-y-1/2 absolute left-[52px] size-[64px] top-1/2" data-node-id="I1888:1438;1728:606" data-name="Navigation / icon">
            <div className="absolute inset-0 overflow-clip" data-node-id="I1888:1438;1728:606;1727:606" data-name="Image / icon-slots">
              <div className="absolute inset-[-7.56%_-4.03%_-4.7%_-8.24%]" data-node-id="I1888:1438;1728:606;1727:607" data-name="Source / icon-slots">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSourceIconSlots} />
              </div>
            </div>
          </div>
          <div className="absolute h-[106px] left-[288.4px] overflow-clip top-0 w-[91.605px]" data-node-id="I1888:1438;1728:604" data-name="Button skin slice / 2">
            <div className="absolute h-[106px] left-0 top-0 w-[91.605px]" data-node-id="I1888:1438;1728:605" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[148.97%] left-[-414.29%] max-w-none top-[-25.51%] w-[517.14%]" src={imgSourceSliceWoodButton2} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col items-center justify-center leading-[1.4] left-1/2 not-italic overflow-clip text-center top-[calc(50%+6px)] w-[212px] whitespace-nowrap" data-node-id="I1888:1438;1744:1008" data-name="Content / labels">
            <p className="bg-clip-text font-['Paperlogy:7_Bold'] mb-[-2px] relative shrink-0 text-[21px] text-[transparent] text-shadow-[0px_0.7px_0px_#6b400f,0px_1.5px_0px_#291405,0px_2.2px_1.3px_rgba(1,6,5,0.9)]" data-node-id="I1888:1438;1728:609" style={{ backgroundImage: "linear-gradient(180deg, rgb(255, 252, 224) 0%, rgb(255, 235, 161) 30%, rgb(207, 150, 64) 49%, rgb(255, 247, 196) 52%, rgb(222, 171, 82) 100%)" }}>
              スロットゲーム
            </p>
            <p className="font-['Paperlogy:5_Medium'] relative shrink-0 text-[#ebd9a6] text-[10.5px] tracking-[0.9px]" data-node-id="I1888:1438;1728:610">
              SLOT GAMES
            </p>
          </div>
        </a>
        <div className="content-stretch drop-shadow-[0px_0px_7px_rgba(229,186,87,0.3)] flex gap-[12px] h-[106px] items-center justify-center relative shrink-0 w-[380px]" data-node-id="1888:1439" data-name="Menu / 공지사항">
          <div className="absolute h-[106px] left-[89.6px] overflow-clip top-0 w-[200.79px]" data-node-id="I1888:1439;1728:626" data-name="Button skin slice / 1">
            <div className="absolute h-[106px] left-0 top-0 w-[200.79px]" data-node-id="I1888:1439;1728:627" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[148.97%] left-[-31.47%] max-w-none top-[-25.51%] w-[162.87%]" src={imgSourceSliceWoodButton2} />
              </div>
            </div>
          </div>
          <div className="absolute h-[106px] left-0 overflow-clip top-0 w-[91.605px]" data-node-id="I1888:1439;1728:624" data-name="Button skin slice / 0">
            <div className="absolute h-[106px] left-0 top-0 w-[91.605px]" data-node-id="I1888:1439;1728:625" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[148.97%] left-[-3.1%] max-w-none top-[-25.51%] w-[517.14%]" src={imgSourceSliceWoodButton2} />
              </div>
            </div>
          </div>
          <div className="absolute h-[106px] left-[288.4px] overflow-clip top-0 w-[91.605px]" data-node-id="I1888:1439;1728:628" data-name="Button skin slice / 2">
            <div className="absolute h-[106px] left-0 top-0 w-[91.605px]" data-node-id="I1888:1439;1728:629" data-name="Source slice / wood-button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[148.97%] left-[-414.29%] max-w-none top-[-25.51%] w-[517.14%]" src={imgSourceSliceWoodButton2} />
              </div>
            </div>
          </div>
          <div className="-translate-y-1/2 absolute left-[52px] size-[64px] top-1/2" data-node-id="I1888:1439;1728:630" data-name="Navigation / icon">
            <div className="absolute inset-0 overflow-clip" data-node-id="I1888:1439;1728:630;1727:609" data-name="Image / icon-letter">
              <div className="absolute inset-[0.3%_-4.96%_-2.78%_-7.18%]" data-node-id="I1888:1439;1728:630;1727:610" data-name="Source / icon-letter">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSourceIconLetter} />
              </div>
            </div>
          </div>
          <div className="absolute left-[338px] size-[8px] top-[49px]" data-node-id="I1888:1439;1728:633" data-name="Selected / warm light">
            <div className="absolute inset-[-125%]">
              <img alt="" className="block max-w-none size-full" src={imgSelectedWarmLight} />
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col items-center justify-center leading-[1.4] left-1/2 not-italic overflow-clip text-center top-[calc(50%+6px)] w-[212px] whitespace-nowrap" data-node-id="I1888:1439;1744:1010" data-name="Content / labels">
            <p className="bg-clip-text font-['Paperlogy:7_Bold'] mb-[-2px] relative shrink-0 text-[21px] text-[transparent] text-shadow-[0px_0.7px_0px_#6b400f,0px_1.5px_0px_#291405,0px_2.2px_1.3px_rgba(1,6,5,0.9)]" data-node-id="I1888:1439;1728:631" style={{ backgroundImage: "linear-gradient(180deg, rgb(255, 252, 224) 0%, rgb(255, 235, 161) 30%, rgb(207, 150, 64) 49%, rgb(255, 247, 196) 52%, rgb(222, 171, 82) 100%)" }}>
              お知らせ
            </p>
            <p className="font-['Paperlogy:5_Medium'] relative shrink-0 text-[#ebd9a6] text-[10.5px] tracking-[0.9px]" data-node-id="I1888:1439;1728:632">
              NOTICE
            </p>
          </div>
        </div>
      </div>
      <P29NoticeBoardPagesAndArticles className="absolute backdrop-blur-[6px] bg-[var(--color\/deep,#071b16)] border border-[var(--color\/gold,#dbbe79)] border-solid h-[350px] left-[296px] rounded-[18px] top-[598px] w-[1328px]" />
    </div>
  );
}
