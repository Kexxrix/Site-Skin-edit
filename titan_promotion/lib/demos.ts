export type DemoCategory = "casino" | "tojino"

export type Demo = {
  name: string
  category: DemoCategory
  categoryLabel: string
  image: string
  href: string
  solution: "토지노 솔루션" | "카지노 솔루션"
}

export const DEMOS: Demo[] = [
  {
    name: "CAT VILLAGE",
    category: "casino",
    categoryLabel: "카지노·슬롯",
    image: "/assets/cat-village.webp",
    href: "https://titan-solution-t01.pages.dev/",
    solution: "카지노 솔루션",
  },
  {
    name: "GIRLS FRONTLINE",
    category: "casino",
    categoryLabel: "카지노·슬롯",
    image: "/assets/girls-frontline.webp",
    href: "https://titan-solution-t07.pages.dev/",
    solution: "카지노 솔루션",
  },
  {
    name: "GROUND ZERO",
    category: "casino",
    categoryLabel: "카지노·슬롯",
    image: "/assets/ground-zero.webp",
    href: "https://titan-solution-t06.pages.dev/",
    solution: "카지노 솔루션",
  },
  {
    name: "風林花山",
    category: "casino",
    categoryLabel: "카지노·슬롯",
    image: "/assets/fire.webp",
    href: "https://titan-solution-t08.pages.dev/",
    solution: "카지노 솔루션",
  },
  {
    name: "AURES",
    category: "tojino",
    categoryLabel: "스포츠·카지노·슬롯",
    image: "/assets/aures.webp",
    href: "https://titan-solution-t02.pages.dev/",
    solution: "토지노 솔루션",
  },
  {
    name: "COBALT",
    category: "tojino",
    categoryLabel: "스포츠·카지노·슬롯",
    image: "/assets/cobalt.webp",
    href: "https://titan-solution-t03.pages.dev/",
    solution: "토지노 솔루션",
  },
  {
    name: "LUMIÈRE",
    category: "tojino",
    categoryLabel: "스포츠·카지노·슬롯",
    image: "/assets/lumiere.webp",
    href: "https://titan-solution-t04.pages.dev/",
    solution: "토지노 솔루션",
  },
  {
    name: "GTA CASINO",
    category: "tojino",
    categoryLabel: "스포츠·카지노·슬롯",
    image: "/assets/gta-casino.webp",
    href: "https://titan-solution-t05.pages.dev/",
    solution: "토지노 솔루션",
  },
]
