import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">404</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Här var det omålat</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">
        Sidan du letar efter finns inte eller har flyttat. Börja om från startsidan eller hör av dig direkt.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          Till startsidan
        </Link>
        <Link href="/kontakt" className="btn btn-outline">
          Kontakt
        </Link>
      </div>
    </div>
  );
}
