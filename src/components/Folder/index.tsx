
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  )
}
