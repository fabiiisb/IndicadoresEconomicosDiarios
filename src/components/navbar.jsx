import CurrentTime from "@/components/currentTime";
import CurrentDate from "@/components/currentDate";
import banderaChile from "@/assets/chilebandera.png"
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav
      className="flex items-center justify-between mb-10"
    >
      <h1>Indicadores económicos diarios</h1>

      <div className="flex items-center gap-3">
        <div>
          <Image
            className="h-6 w-6"
            src={banderaChile}
            alt="Chile"
          />
        </div>
        <div className="flex flex-col">
          <CurrentTime />
          <CurrentDate />
        </div>
      </div>
    </nav>
  )
}

export default Navbar