export default function Logo({onClick} : {onClick?:() => void}){
    return(
        <span onClick={onClick} className={`text-primary flex flex-col items-center`}>
            <h2 className="lg:text-7xl md:text-6xl text-5xl font-black">
                E3
            </h2>
            <h3 className="text-primary upper text-md text-center text-upper font-light">
                RRHH
            </h3>
        </span>
    )
}