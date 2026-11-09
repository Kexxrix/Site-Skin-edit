const imgGameArtwork = "https://www.figma.com/api/mcp/asset/2a3889d3-be12-417a-9cea-8002e39eb5ac.png";
const imgImageThinLacquerAndBrassFrame = "https://www.figma.com/api/mcp/asset/331cbc74-d1f5-41b7-855e-752f8a81a2fe.png";
const imgGameArtwork1 = "https://www.figma.com/api/mcp/asset/d34530eb-e7d2-4d3b-bccf-469c1eeb8fd8.png";
const imgGameArtwork2 = "https://www.figma.com/api/mcp/asset/fb5f5b8f-8b32-4865-92ed-1fa4851e4f85.png";
const imgGameArtwork3 = "https://www.figma.com/api/mcp/asset/61cfb8d0-c18f-41f4-b51a-a95b0b147132.png";
const imgGameArtwork4 = "https://www.figma.com/api/mcp/asset/8a6d5efa-2001-4222-b025-84bc501b356c.png";
const imgIconBrassChevron = "https://www.figma.com/api/mcp/asset/741626bc-cc5a-459a-94ef-212a1d424272.svg";
const imgIconBrassChevron1 = "https://www.figma.com/api/mcp/asset/7064358c-fd32-4026-af54-3af447cb6374.svg";
const imgImageIconFeatured = "https://www.figma.com/api/mcp/asset/eeefdbc2-bf1e-463f-b9fb-93b82eabb7ef.png";
const imgImageIconWallet = "https://www.figma.com/api/mcp/asset/e6f00477-b872-4693-97cc-aaef69826a4a.png";
const imgImageIconNotice = "https://www.figma.com/api/mcp/asset/3a1ed706-2afb-46a6-a6dc-fa7dcf045c71.png";
const imgBackgroundNightBridgeAndNoFace = "https://www.figma.com/api/mcp/asset/f7923615-27fd-4c04-a9b8-9d221f070df8.png";
const imgImageMainAburayaEmblem = "https://www.figma.com/api/mcp/asset/fddef95f-b06a-4604-9f36-df3e377937ad.png";
const imgImageBathhouseSectionTitle = "https://www.figma.com/api/mcp/asset/334ed0be-cc42-41da-a92d-e1016228daef.png";
const imgImageCompactAburayaWordmark = "https://www.figma.com/api/mcp/asset/de307a74-44bd-4d90-ab9b-6efc28aff0c7.png";
const imgSkinContinuousLacquerButton = "https://www.figma.com/api/mcp/asset/8803948f-0ab7-4685-9501-99ae01e90016.png";
const imgImageIconSupport = "https://www.figma.com/api/mcp/asset/ef998f64-2aff-4f15-a2b2-70d5e32c8ece.png";
const imgSkinContinuousLacquerNavigation = "https://www.figma.com/api/mcp/asset/25712dd3-93cd-4194-9303-2fb248a3dd9c.png";
const imgImageIconLive = "https://www.figma.com/api/mcp/asset/fb4a4343-54d4-4206-8e28-3ff84a47e9ff.png";
const imgImageIconSlots = "https://www.figma.com/api/mcp/asset/4bccedb9-4325-402d-a682-259f454fb8e2.png";

type P30FeaturedCardProps = {
  className?: string;
  english?: string;
  japanese?: string;
  state?: "Default";
};

function P30FeaturedCard({ className, english = "WATER TRAIN", japanese = "水上を走る列車", state = "Default" }: P30FeaturedCardProps) {
  return (
    <div className={className || "drop-shadow-[0px_4px_4px_rgba(0,0,5,0.48)] h-[302.464px] relative w-[272px]"} data-node-id="1931:640">
      <div className="absolute h-[256.768px] left-[26.11px] rounded-[9px] top-[28.29px] w-[219.776px]" data-node-id="1931:641" data-name="Game / artwork">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9px]">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgGameArtwork} />
        </div>
      </div>
      <div className="absolute bg-gradient-to-b from-[rgba(8,5,15,0)] h-[113.152px] left-[26.11px] to-[rgba(8,5,15,0.98)] top-[171.9px] via-[45%] via-[rgba(8,5,15,0.76)] w-[219.776px]" data-node-id="1931:642" data-name="Readability / lower label gradient" />
      <div className="absolute h-[302.464px] left-0 top-0 w-[272px]" data-node-id="1931:643" data-name="Image / thin lacquer and brass frame">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[108.1%] left-[-3.69%] max-w-none top-[-2.18%] w-[107.29%]" src={imgImageThinLacquerAndBrassFrame} />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[136px] not-italic text-[18px] text-[color:var(--color\/cream,#fff2cc)] text-center top-[241.98px] w-[202.368px]" data-node-id="1931:644">
        <p className="leading-[27px]">{japanese}</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] justify-center leading-[0] left-[136px] not-italic text-[10px] text-[color:var(--color\/muted,#c9b795)] text-center top-[268.03px] w-[202.368px]" data-node-id="1931:645">
        <p className="leading-[16px]">{english}</p>
      </div>
    </div>
  );
}

type P30FeaturedCard1Props = {
  className?: string;
  english?: string;
  japanese?: string;
  state?: "Default";
};

function P30FeaturedCard1({ className, english = "BOILER ROOM", japanese = "釜爺の仕事場", state = "Default" }: P30FeaturedCard1Props) {
  return (
    <div className={className || "drop-shadow-[0px_4px_4px_rgba(0,0,5,0.48)] h-[302.464px] relative w-[272px]"} data-node-id="1931:626">
      <div className="absolute h-[256.768px] left-[26.11px] rounded-[9px] top-[28.29px] w-[219.776px]" data-node-id="1931:627" data-name="Game / artwork">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9px]">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgGameArtwork1} />
        </div>
      </div>
      <div className="absolute bg-gradient-to-b from-[rgba(8,5,15,0)] h-[113.152px] left-[26.11px] to-[rgba(8,5,15,0.98)] top-[171.9px] via-[45%] via-[rgba(8,5,15,0.76)] w-[219.776px]" data-node-id="1931:628" data-name="Readability / lower label gradient" />
      <div className="absolute h-[302.464px] left-0 top-0 w-[272px]" data-node-id="1931:629" data-name="Image / thin lacquer and brass frame">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[108.1%] left-[-3.69%] max-w-none top-[-2.18%] w-[107.29%]" src={imgImageThinLacquerAndBrassFrame} />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] font-black justify-center leading-[0] left-[136px] text-[18px] text-[color:var(--color\/cream,#fff2cc)] text-center top-[241.98px] w-[202.368px]" data-node-id="1931:630">
        <p className="leading-[27px]">{japanese}</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] justify-center leading-[0] left-[136px] not-italic text-[10px] text-[color:var(--color\/muted,#c9b795)] text-center top-[268.03px] w-[202.368px]" data-node-id="1931:631">
        <p className="leading-[16px]">{english}</p>
      </div>
    </div>
  );
}

type P30FeaturedCard2Props = {
  className?: string;
  english?: string;
  japanese?: string;
  state?: "Default";
};

function P30FeaturedCard2({ className, english = "HAKU'S FLIGHT", japanese = "白龍の空旅", state = "Default" }: P30FeaturedCard2Props) {
  return (
    <div className={className || "drop-shadow-[0px_4px_4px_rgba(0,0,5,0.48)] h-[302.464px] relative w-[272px]"} data-node-id="1931:612">
      <div className="absolute h-[256.768px] left-[26.11px] rounded-[9px] top-[28.29px] w-[219.776px]" data-node-id="1931:613" data-name="Game / artwork">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9px]">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgGameArtwork2} />
        </div>
      </div>
      <div className="absolute bg-gradient-to-b from-[rgba(8,5,15,0)] h-[113.152px] left-[26.11px] to-[rgba(8,5,15,0.98)] top-[171.9px] via-[45%] via-[rgba(8,5,15,0.76)] w-[219.776px]" data-node-id="1931:614" data-name="Readability / lower label gradient" />
      <div className="absolute h-[302.464px] left-0 top-0 w-[272px]" data-node-id="1931:615" data-name="Image / thin lacquer and brass frame">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[108.1%] left-[-3.69%] max-w-none top-[-2.18%] w-[107.29%]" src={imgImageThinLacquerAndBrassFrame} />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] font-black justify-center leading-[0] left-[136px] text-[18px] text-[color:var(--color\/cream,#fff2cc)] text-center top-[241.98px] w-[202.368px]" data-node-id="1931:616">
        <p className="leading-[27px]">{japanese}</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] justify-center leading-[0] left-[136px] not-italic text-[10px] text-[color:var(--color\/muted,#c9b795)] text-center top-[268.03px] w-[202.368px]" data-node-id="1931:617">
        <p className="leading-[16px]">{english}</p>
      </div>
    </div>
  );
}

type P30FeaturedCard3Props = {
  className?: string;
  english?: string;
  japanese?: string;
  state?: "Default";
};

function P30FeaturedCard3({ className, english = "NIGHT BATHHOUSE", japanese = "夜の油屋", state = "Default" }: P30FeaturedCard3Props) {
  return (
    <div className={className || "drop-shadow-[0px_4px_4px_rgba(0,0,5,0.48)] h-[302.464px] relative w-[272px]"} data-node-id="1931:598">
      <div className="absolute h-[256.768px] left-[26.11px] rounded-[9px] top-[28.29px] w-[219.776px]" data-node-id="1931:599" data-name="Game / artwork">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9px]">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgGameArtwork3} />
        </div>
      </div>
      <div className="absolute bg-gradient-to-b from-[rgba(8,5,15,0)] h-[113.152px] left-[26.11px] to-[rgba(8,5,15,0.98)] top-[171.9px] via-[45%] via-[rgba(8,5,15,0.76)] w-[219.776px]" data-node-id="1931:600" data-name="Readability / lower label gradient" />
      <div className="absolute h-[302.464px] left-0 top-0 w-[272px]" data-node-id="1931:601" data-name="Image / thin lacquer and brass frame">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[108.1%] left-[-3.69%] max-w-none top-[-2.18%] w-[107.29%]" src={imgImageThinLacquerAndBrassFrame} />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[136px] not-italic text-[18px] text-[color:var(--color\/cream,#fff2cc)] text-center top-[241.98px] w-[202.368px]" data-node-id="1931:602">
        <p className="leading-[27px]">{japanese}</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] justify-center leading-[0] left-[136px] not-italic text-[10px] text-[color:var(--color\/muted,#c9b795)] text-center top-[268.03px] w-[202.368px]" data-node-id="1931:603">
        <p className="leading-[16px]">{english}</p>
      </div>
    </div>
  );
}

type P30FeaturedCard4Props = {
  className?: string;
  english?: string;
  japanese?: string;
  state?: "Default";
};

function P30FeaturedCard4({ className, english = "ZENIBA'S COTTAGE", japanese = "銭婆の小さな家", state = "Default" }: P30FeaturedCard4Props) {
  return (
    <div className={className || "drop-shadow-[0px_4px_4px_rgba(0,0,5,0.48)] h-[302.464px] relative w-[272px]"} data-node-id="1931:654">
      <div className="absolute h-[256.768px] left-[26.11px] rounded-[9px] top-[28.29px] w-[219.776px]" data-node-id="1931:655" data-name="Game / artwork">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9px]">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgGameArtwork4} />
        </div>
      </div>
      <div className="absolute bg-gradient-to-b from-[rgba(8,5,15,0)] h-[113.152px] left-[26.11px] to-[rgba(8,5,15,0.98)] top-[171.9px] via-[45%] via-[rgba(8,5,15,0.76)] w-[219.776px]" data-node-id="1931:656" data-name="Readability / lower label gradient" />
      <div className="absolute h-[302.464px] left-0 top-0 w-[272px]" data-node-id="1931:657" data-name="Image / thin lacquer and brass frame">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[108.1%] left-[-3.69%] max-w-none top-[-2.18%] w-[107.29%]" src={imgImageThinLacquerAndBrassFrame} />
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[136px] not-italic text-[18px] text-[color:var(--color\/cream,#fff2cc)] text-center top-[241.98px] w-[202.368px]" data-node-id="1931:658">
        <p className="leading-[27px]">{japanese}</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] justify-center leading-[0] left-[136px] not-italic text-[10px] text-[color:var(--color\/muted,#c9b795)] text-center top-[268.03px] w-[202.368px]" data-node-id="1931:659">
        <p className="leading-[16px]">{english}</p>
      </div>
    </div>
  );
}

type P30FeaturedCarouselFiveScenesProps = {
  className?: string;
  slide?: "01";
};

function P30FeaturedCarouselFiveScenes({ className, slide = "01" }: P30FeaturedCarouselFiveScenesProps) {
  return (
    <div className={className || "backdrop-blur-[2.5px] bg-gradient-to-b from-[rgba(16,14,37,0.12)] h-[324px] relative rounded-[16px] to-[rgba(16,14,37,0.32)] via-1/2 via-[rgba(16,14,37,0.2)] w-[1568px]"} data-node-id="1931:668">
      <div className="absolute h-px left-0 top-0 w-[1568px]" data-node-id="1931:669" style={{ backgroundImage: "linear-gradient(90deg, rgba(184, 135, 71, 0) 0%, rgba(184, 135, 71, 0.72) 18%, rgba(184, 135, 71, 0.72) 82%, rgba(184, 135, 71, 0) 100%)" }} data-name="Panel / upper fading brass rule" />
      <div className="absolute h-px left-0 top-[323px] w-[1568px]" data-node-id="1931:670" style={{ backgroundImage: "linear-gradient(90deg, rgba(184, 135, 71, 0) 0%, rgba(184, 135, 71, 0.72) 18%, rgba(184, 135, 71, 0.72) 82%, rgba(184, 135, 71, 0) 100%)" }} data-name="Panel / lower fading brass rule" />
      <P30FeaturedCard3 className="absolute drop-shadow-[0px_4px_4px_rgba(0,0,5,0.48)] h-[302.464px] left-[88px] top-[10.77px] w-[272px]" />
      <P30FeaturedCard2 className="absolute drop-shadow-[0px_4px_4px_rgba(0,0,5,0.48)] h-[302.464px] left-[368px] top-[10.77px] w-[272px]" />
      <P30FeaturedCard1 className="absolute drop-shadow-[0px_4px_4px_rgba(0,0,5,0.48)] h-[302.464px] left-[648px] top-[10.77px] w-[272px]" />
      <P30FeaturedCard className="absolute drop-shadow-[0px_4px_4px_rgba(0,0,5,0.48)] h-[302.464px] left-[928px] top-[10.77px] w-[272px]" />
      <P30FeaturedCard4 className="absolute drop-shadow-[0px_4px_4px_rgba(0,0,5,0.48)] h-[302.464px] left-[1208px] top-[10.77px] w-[272px]" />
      <button className="absolute block cursor-pointer left-[18px] size-[44px] top-[140px]" data-node-id="1931:701" data-name="Arrow / left">
        <div className="absolute h-[34px] left-[10px] top-[5px] w-[24px]" data-node-id="1931:702" data-name="Icon / brass chevron">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBrassChevron} />
        </div>
      </button>
      <button className="absolute block cursor-pointer left-[1506px] size-[44px] top-[140px]" data-node-id="1931:704" data-name="Arrow / right">
        <div className="absolute flex h-[34px] items-center justify-center left-[10px] top-[5px] w-[24px]" data-node-id="1931:705">
          <div className="flex-none rotate-180">
            <div className="h-[34px] relative w-[24px]" data-name="Icon / brass chevron">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBrassChevron1} />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function P30IconsIconFeatured({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[64px]"} data-node-id="1928:570" data-name="P30 / Icons / icon-featured">
      <div className="absolute inset-[0_24.18%]" data-node-id="1928:571" data-name="Image / icon-featured">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[103.29%] left-[-49.92%] max-w-none top-[-1.65%] w-[200%]" src={imgImageIconFeatured} />
        </div>
      </div>
    </div>
  );
}

function P30IconsIconWallet({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[64px]"} data-node-id="1928:578" data-name="P30 / Icons / icon-wallet">
      <div className="absolute inset-[0_0.93%]" data-node-id="1928:579" data-name="Image / icon-wallet">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[122.58%] left-[-13.25%] max-w-none top-[-11.14%] w-[124.9%]" src={imgImageIconWallet} />
        </div>
      </div>
    </div>
  );
}

function P30IconsIconNotice({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[64px]"} data-node-id="1928:576" data-name="P30 / Icons / icon-notice">
      <div className="absolute inset-[1.33%_0]" data-node-id="1928:577" data-name="Image / icon-notice">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[118.53%] left-[-8.83%] max-w-none top-[-9.26%] w-[115.36%]" src={imgImageIconNotice} />
        </div>
      </div>
    </div>
  );
}

export default function Aburaya19201080() {
  return (
    <div className="relative size-full" data-node-id="1924:1623" data-name="ABURAYA · おすすめゲーム · 夜の油屋 · 1920×1080">
      <div className="absolute h-[1080px] left-0 top-0 w-[1920px]" data-node-id="1926:552" data-name="Background / night bridge and No-Face">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBackgroundNightBridgeAndNoFace} />
      </div>
      <div className="absolute h-[450px] left-0 top-[76px] w-[1920px]" data-node-id="1926:553" data-name="Hero / ABURAYA identity">
        <div className="absolute h-[354px] left-[150px] top-[20px] w-[720px]" data-node-id="1926:554" data-name="Image / main ABURAYA emblem">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[103.26%] left-[-1.27%] max-w-none top-[-1.4%] w-[102.6%]" src={imgImageMainAburayaEmblem} />
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] font-medium justify-center leading-[0] left-[182px] text-[#0b1729] text-[20px] top-[388px] w-[620px]" data-node-id="1926:555">
          <p className="leading-[28px]">不思議な夜へ、ようこそ。</p>
        </div>
      </div>
      <div className="absolute h-[93.202px] left-[700px] top-[506px] w-[520px]" data-node-id="1926:556" data-name="Section title / おすすめゲーム">
        <div className="absolute h-[93.202px] left-0 top-0 w-[520px]" data-node-id="1926:557" data-name="Image / bathhouse section title">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[141.12%] left-[-2.28%] max-w-none top-[-14.86%] w-[104.5%]" src={imgImageBathhouseSectionTitle} />
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute bg-clip-text flex flex-col font-['Paperlogy:9_Black'] justify-center leading-[0] left-[260px] not-italic text-[26px] text-[transparent] text-center text-shadow-[0px_1.2px_0px_#1a0409,0px_2px_2px_rgba(0,0,0,0.5)] top-[56.5px] w-[336px]" data-node-id="1926:558" style={{ backgroundImage: "linear-gradient(180deg, rgb(255, 250, 217) 0%, rgb(250, 207, 117) 42%, rgb(178, 107, 41) 50%, rgb(255, 242, 189) 56%, rgb(212, 156, 74) 100%)" }}>
          <p className="leading-[29px]">おすすめゲーム</p>
        </div>
      </div>
      <div className="absolute bg-gradient-to-b from-[rgba(10,6,23,0)] h-[150px] left-0 to-[rgba(10,6,23,0.88)] top-[930px] w-[1920px]" data-node-id="1926:559" data-name="Readability / dock horizon shade" />
      <div className="absolute backdrop-blur-[6px] bg-[var(--color\/deep,#100e25)] h-[76px] left-0 top-0 w-[1920px]" data-node-id="1927:1626" data-name="Header / account and service">
        <div className="absolute bg-[var(--color\/brass,#bc9456)] h-px left-0 top-[75px] w-[1920px]" data-node-id="1927:1627" data-name="Header / fine brass rule" />
        <div className="absolute h-[38.6px] left-[42px] top-[18.7px] w-[260px]" data-node-id="1927:1628" data-name="Image / compact ABURAYA wordmark">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[243.77%] left-[-4.4%] max-w-none top-[-74.75%] w-[108.71%]" src={imgImageCompactAburayaWordmark} />
          </div>
        </div>
        <div className="absolute content-stretch flex gap-[8px] h-[44px] items-start left-[916px] top-[16px] w-[528px]" data-node-id="1927:1629" data-name="Services / horizontal actions">
          <div className="h-[44px] relative shrink-0 w-[126px]" data-node-id="1927:1630" data-name="Service / 入金">
            <div className="absolute h-[44px] left-0 top-0 w-[126px]" data-node-id="I1927:1630;1927:1623" data-name="Skin / continuous lacquer button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[165.55%] left-[-2.42%] max-w-none top-[-30.43%] w-[104.83%]" src={imgSkinContinuousLacquerButton} />
              </div>
            </div>
            <div className="absolute left-[5px] size-[34px] top-[5px]" data-node-id="I1927:1630;1927:1624" data-name="Icon / replaceable">
              <P30IconsIconWallet className="absolute left-0 size-[34px] top-0" />
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[68px] not-italic text-[18px] text-[color:var(--color\/cream,#fff2cc)] text-center top-[22px] w-[56px]" data-node-id="I1927:1630;1927:1625">
              <p className="leading-[26px]">入金</p>
            </div>
          </div>
          <div className="h-[44px] relative shrink-0 w-[126px]" data-node-id="1927:1634" data-name="Service / 出金">
            <div className="absolute h-[44px] left-0 top-0 w-[126px]" data-node-id="I1927:1634;1927:1623" data-name="Skin / continuous lacquer button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[165.55%] left-[-2.42%] max-w-none top-[-30.43%] w-[104.83%]" src={imgSkinContinuousLacquerButton} />
              </div>
            </div>
            <div className="absolute left-[5px] size-[34px] top-[5px]" data-node-id="I1927:1634;1927:1624" data-name="Icon / replaceable">
              <P30IconsIconWallet className="absolute left-0 size-[34px] top-0" />
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[68px] not-italic text-[18px] text-[color:var(--color\/cream,#fff2cc)] text-center top-[22px] w-[56px]" data-node-id="I1927:1634;1927:1625">
              <p className="leading-[26px]">出金</p>
            </div>
          </div>
          <div className="h-[44px] relative shrink-0 w-[126px]" data-node-id="1927:1638" data-name="Service / メール">
            <div className="absolute h-[44px] left-0 top-0 w-[126px]" data-node-id="I1927:1638;1927:1623" data-name="Skin / continuous lacquer button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[165.55%] left-[-2.42%] max-w-none top-[-30.43%] w-[104.83%]" src={imgSkinContinuousLacquerButton} />
              </div>
            </div>
            <div className="absolute left-[5px] size-[34px] top-[5px]" data-node-id="I1927:1638;1927:1624" data-name="Icon / replaceable">
              <div className="absolute left-0 size-[34px] top-0" data-node-id="I1927:1638;1928:582" data-name="Action / icon">
                <div className="absolute inset-[1.33%_0]" data-node-id="I1927:1638;1928:582;1928:577" data-name="Image / icon-notice">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[118.53%] left-[-8.83%] max-w-none top-[-9.26%] w-[115.36%]" src={imgImageIconNotice} />
                  </div>
                </div>
              </div>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[68px] not-italic text-[18px] text-[color:var(--color\/cream,#fff2cc)] text-center top-[22px] w-[56px]" data-node-id="I1927:1638;1927:1625">
              <p className="leading-[26px]">メール</p>
            </div>
          </div>
          <div className="h-[44px] relative shrink-0 w-[126px]" data-node-id="1927:1642" data-name="Service / 問合せ">
            <div className="absolute h-[44px] left-0 top-0 w-[126px]" data-node-id="I1927:1642;1927:1623" data-name="Skin / continuous lacquer button">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[165.55%] left-[-2.42%] max-w-none top-[-30.43%] w-[104.83%]" src={imgSkinContinuousLacquerButton} />
              </div>
            </div>
            <div className="absolute left-[5px] size-[34px] top-[5px]" data-node-id="I1927:1642;1927:1624" data-name="Icon / replaceable">
              <div className="absolute left-0 size-[34px] top-0" data-node-id="I1927:1642;1928:582" data-name="Action / icon">
                <div className="absolute inset-[1.33%_0]" data-node-id="I1927:1642;1928:582;1928:581" data-name="Image / icon-support">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[118.53%] left-[-7.73%] max-w-none top-[-9.07%] w-[115.36%]" src={imgImageIconSupport} />
                  </div>
                </div>
              </div>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:8_ExtraBold'] justify-center leading-[0] left-[68px] not-italic text-[18px] text-[color:var(--color\/cream,#fff2cc)] text-center top-[22px] w-[56px]" data-node-id="I1927:1642;1927:1625">
              <p className="leading-[26px]">問合せ</p>
            </div>
          </div>
        </div>
        <div className="absolute h-[42px] left-[330px] top-[17px] w-[560px]" data-node-id="1927:1646" data-name="Notice / bathhouse ticker">
          <div className="absolute bg-gradient-to-b border border-[var(--color\/brass,#bc9456)] border-solid from-[rgba(71,26,36,0.94)] h-[42px] left-0 rounded-[21px] to-[rgba(23,9,23,0.98)] top-0 w-[560px]" data-node-id="1927:1647" data-name="Ticker / lacquer surface" />
          <div className="absolute left-[12px] size-[27px] top-[8px]" data-node-id="1927:1648" data-name="Icon / notice">
            <P30IconsIconNotice className="absolute left-0 size-[27px] top-0" />
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] justify-center leading-[0] left-[50px] not-italic text-[14px] text-[color:var(--color\/brass,#bc9456)] top-[21px] w-[34px]" data-node-id="1927:1649">
            <p className="leading-[20px]">案内</p>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] justify-center leading-[0] left-[84px] not-italic text-[13.5px] text-[color:var(--color\/cream,#fff2cc)] top-[21px] w-[414px]" data-node-id="1927:1650">
            <p className="leading-[20px]">油屋へようこそ</p>
          </div>
        </div>
        <div className="absolute h-[44px] left-[1466px] top-[16px] w-[218px]" data-node-id="1927:1651" data-name="Account / guest credits">
          <div className="absolute left-0 size-[30px] top-[7px]" data-node-id="1927:1652" data-name="Icon / wallet">
            <P30IconsIconWallet className="absolute left-0 size-[30px] top-0" />
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] justify-center leading-[0] left-[40px] not-italic text-[11px] text-[color:var(--color\/muted,#c9b795)] top-[9.5px] w-[164px]" data-node-id="1927:1653">
            <p className="leading-[15px]">保有クレジット</p>
          </div>
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] justify-center leading-[0] left-[40px] not-italic text-[14px] text-[color:var(--color\/cream,#fff2cc)] top-[30px] w-[164px]" data-node-id="1927:1654">
            <p className="leading-[20px]">ログイン後に確認</p>
          </div>
        </div>
        <div className="absolute h-[44px] left-[1712px] top-[16px] w-[172px]" data-node-id="1927:1655" data-name="Entry / login button">
          <div className="absolute h-[44px] left-0 top-0 w-[172px]" data-node-id="1927:1656" data-name="Skin / continuous login">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[165.55%] left-[-2.42%] max-w-none top-[-30.43%] w-[104.83%]" src={imgSkinContinuousLacquerButton} />
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:7_Bold'] justify-center leading-[0] left-[86px] not-italic text-[19px] text-[color:var(--color\/cream,#fff2cc)] text-center top-[22px] w-[120px]" data-node-id="1927:1657">
            <p className="leading-[28px]">ログイン</p>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[16px] h-[106px] items-start left-[176px] top-[963px] w-[1568px]" data-node-id="1928:620" data-name="Navigation / fixed bathhouse dock">
        <div className="drop-shadow-[0px_0px_7px_rgba(255,161,61,0.35)] h-[106px] relative shrink-0 w-[380px]" data-node-id="1928:621" data-name="Menu / おすすめゲーム">
          <div className="absolute flex h-[106px] items-center justify-center left-0 top-0 w-[380px]" data-node-id="I1928:621;1928:613">
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="h-[106px] relative w-[380px]" data-name="Skin / continuous lacquer navigation">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[170.46%] left-[-2.92%] max-w-none top-[-43.76%] w-[105.21%]" src={imgSkinContinuousLacquerNavigation} />
                </div>
              </div>
            </div>
          </div>
          <P30IconsIconFeatured className="absolute left-[4px] size-[64px] top-[12px]" />
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute bg-clip-text flex flex-col font-['Paperlogy:7_Bold'] justify-center leading-[0] left-[190px] not-italic text-[21px] text-[transparent] text-center text-shadow-[0px_1.2px_0px_#1a0409,0px_2px_2px_rgba(0,0,0,0.5)] top-[38.5px] w-[212px]" data-node-id="I1928:621;1928:616" style={{ backgroundImage: "linear-gradient(180deg, rgb(255, 250, 217) 0%, rgb(250, 207, 117) 42%, rgb(178, 107, 41) 50%, rgb(255, 242, 189) 56%, rgb(212, 156, 74) 100%)" }}>
            <p className="leading-[29px]">おすすめゲーム</p>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] justify-center leading-[0] left-[190px] not-italic text-[10.5px] text-[color:var(--color\/muted,#c9b795)] text-center top-[60.5px] w-[212px]" data-node-id="I1928:621;1928:617">
            <p className="leading-[15px]">FEATURED GAMES</p>
          </div>
        </div>
        <a className="block cursor-pointer h-[106px] relative shrink-0 w-[380px]" data-node-id="1928:628" data-name="Menu / ライブカジノ">
          <div className="absolute flex h-[106px] items-center justify-center left-0 top-0 w-[380px]" data-node-id="I1928:628;1928:601">
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="h-[106px] relative w-[380px]" data-name="Skin / continuous lacquer navigation">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[170.46%] left-[-2.92%] max-w-none top-[-43.76%] w-[105.21%]" src={imgSkinContinuousLacquerNavigation} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-[4px] size-[64px] top-[12px]" data-node-id="I1928:628;1928:602" data-name="Navigation / icon">
            <div className="absolute inset-[0.81%_0]" data-node-id="I1928:628;1928:602;1928:573" data-name="Image / icon-live">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[108.1%] left-[-3.05%] max-w-none top-[-4.05%] w-[106.36%]" src={imgImageIconLive} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute bg-clip-text flex flex-col font-['Paperlogy:7_Bold'] justify-center leading-[0] left-[190px] not-italic text-[21px] text-[transparent] text-center text-shadow-[0px_1.2px_0px_#1a0409,0px_2px_2px_rgba(0,0,0,0.5)] top-[38.5px] w-[212px]" data-node-id="I1928:628;1928:604" style={{ backgroundImage: "linear-gradient(180deg, rgb(255, 250, 217) 0%, rgb(250, 207, 117) 42%, rgb(178, 107, 41) 50%, rgb(255, 242, 189) 56%, rgb(212, 156, 74) 100%)" }}>
            <p className="leading-[29px]">ライブカジノ</p>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] justify-center leading-[0] left-[190px] not-italic text-[10.5px] text-[color:var(--color\/muted,#c9b795)] text-center top-[60.5px] w-[212px]" data-node-id="I1928:628;1928:605">
            <p className="leading-[15px]">LIVE CASINO</p>
          </div>
        </a>
        <a className="block cursor-pointer h-[106px] relative shrink-0 w-[380px]" data-node-id="1928:635" data-name="Menu / スロットゲーム">
          <div className="absolute flex h-[106px] items-center justify-center left-0 top-0 w-[380px]" data-node-id="I1928:635;1928:601">
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="h-[106px] relative w-[380px]" data-name="Skin / continuous lacquer navigation">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[170.46%] left-[-2.92%] max-w-none top-[-43.76%] w-[105.21%]" src={imgSkinContinuousLacquerNavigation} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-[4px] size-[64px] top-[12px]" data-node-id="I1928:635;1928:602" data-name="Navigation / icon">
            <div className="absolute inset-[5.19%_0]" data-node-id="I1928:635;1928:602;1928:575" data-name="Image / icon-slots">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[125.15%] left-[-7.78%] max-w-none top-[-14.57%] w-[112.16%]" src={imgImageIconSlots} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute bg-clip-text flex flex-col font-['Paperlogy:7_Bold'] justify-center leading-[0] left-[190px] not-italic text-[21px] text-[transparent] text-center text-shadow-[0px_1.2px_0px_#1a0409,0px_2px_2px_rgba(0,0,0,0.5)] top-[38.5px] w-[212px]" data-node-id="I1928:635;1928:604" style={{ backgroundImage: "linear-gradient(180deg, rgb(255, 250, 217) 0%, rgb(250, 207, 117) 42%, rgb(178, 107, 41) 50%, rgb(255, 242, 189) 56%, rgb(212, 156, 74) 100%)" }}>
            <p className="leading-[29px]">スロットゲーム</p>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] justify-center leading-[0] left-[190px] not-italic text-[10.5px] text-[color:var(--color\/muted,#c9b795)] text-center top-[60.5px] w-[212px]" data-node-id="I1928:635;1928:605">
            <p className="leading-[15px]">SLOT GAMES</p>
          </div>
        </a>
        <a className="block cursor-pointer h-[106px] relative shrink-0 w-[380px]" data-node-id="1928:642" data-name="Menu / お知らせ">
          <div className="absolute flex h-[106px] items-center justify-center left-0 top-0 w-[380px]" data-node-id="I1928:642;1928:601">
            <div className="-scale-y-100 flex-none rotate-180">
              <div className="h-[106px] relative w-[380px]" data-name="Skin / continuous lacquer navigation">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[170.46%] left-[-2.92%] max-w-none top-[-43.76%] w-[105.21%]" src={imgSkinContinuousLacquerNavigation} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-[4px] size-[64px] top-[12px]" data-node-id="I1928:642;1928:602" data-name="Navigation / icon">
            <div className="absolute inset-[1.33%_0]" data-node-id="I1928:642;1928:602;1928:577" data-name="Image / icon-notice">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[118.53%] left-[-8.83%] max-w-none top-[-9.26%] w-[115.36%]" src={imgImageIconNotice} />
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute bg-clip-text flex flex-col font-['Paperlogy:7_Bold'] justify-center leading-[0] left-[190px] not-italic text-[21px] text-[transparent] text-center text-shadow-[0px_1.2px_0px_#1a0409,0px_2px_2px_rgba(0,0,0,0.5)] top-[38.5px] w-[212px]" data-node-id="I1928:642;1928:604" style={{ backgroundImage: "linear-gradient(180deg, rgb(255, 250, 217) 0%, rgb(250, 207, 117) 42%, rgb(178, 107, 41) 50%, rgb(255, 242, 189) 56%, rgb(212, 156, 74) 100%)" }}>
            <p className="leading-[29px]">お知らせ</p>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Paperlogy:5_Medium'] justify-center leading-[0] left-[190px] not-italic text-[10.5px] text-[color:var(--color\/muted,#c9b795)] text-center top-[60.5px] w-[212px]" data-node-id="I1928:642;1928:605">
            <p className="leading-[15px]">NOTICE</p>
          </div>
        </a>
      </div>
      <P30FeaturedCarouselFiveScenes className="absolute backdrop-blur-[2.5px] bg-gradient-to-b from-[rgba(16,14,37,0.12)] h-[324px] left-[176px] rounded-[16px] to-[rgba(16,14,37,0.32)] top-[610px] via-1/2 via-[rgba(16,14,37,0.2)] w-[1568px]" />
    </div>
  );
}
