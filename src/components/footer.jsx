import { Separator } from "@/components/ui/separator"

const Footer = () => {
  return (
    <>
      <footer className="mt-12 mb-1">
        <Separator className="my-3" />
        <div className="flex justify-between">
          <a
            className="text-white hover:underline"
            href={'https://fabianbarrientos.vercel.app/'}
            target={"_blank"}
          >
            Fabian B.
          </a>
          <p className="text-muted-foreground">
            API: {" "}
            <a
              className="text-white hover:underline"
              href={'https://www.mindicador.cl'}
              target={"_blank"}
            >
              mindicador.cl
            </a>
          </p>
        </div>

      </footer>
    </>
  )
}

export default Footer