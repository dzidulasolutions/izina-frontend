
const page = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center font-ui">
            <h2 className="font-righteous text-2xl">404</h2>
            <p className="text-sm">Page introuvable retournez a l&apos;accueil</p>
            <a href="/accueil" className="w-full font-ui bg-primary flex justify-center items-center py-3 text-sm font-semibold text-background mt-8" >Retour a l&apos;accueil</a>
      </div>
    </div>
  )
}

export default page
