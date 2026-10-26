import localFont from 'next/font/local'

// Applied throughout this isolated Paperlogy clone via the root font variable.
// Thin/ExtraLight contain an internal weight of 250; CSS weights are explicit.
export const paperlogy = localFont({
  src: [
    { path: '../../public/fonts/paperlogy/woff2/Paperlogy-1Thin.woff2', weight: '100', style: 'normal' },
    { path: '../../public/fonts/paperlogy/woff2/Paperlogy-2ExtraLight.woff2', weight: '200', style: 'normal' },
    { path: '../../public/fonts/paperlogy/woff2/Paperlogy-3Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/paperlogy/woff2/Paperlogy-4Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/paperlogy/woff2/Paperlogy-5Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/paperlogy/woff2/Paperlogy-6SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/paperlogy/woff2/Paperlogy-7Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/paperlogy/woff2/Paperlogy-8ExtraBold.woff2', weight: '800', style: 'normal' },
    { path: '../../public/fonts/paperlogy/woff2/Paperlogy-9Black.woff2', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  preload: false,
  variable: '--font-paperlogy',
})
