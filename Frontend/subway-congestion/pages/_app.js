import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return(
    <div className="max-w-5xl mx-auto my-10 px-8">
      <Component {...pageProps} />
    </div>
  )
}
