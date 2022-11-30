const Btn = ({fn, className, children}) => {

    return (
        <button onClick={fn} className={className}>{children}</button>
    )
}

export default Btn