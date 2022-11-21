const Btn = (props) => {

    return (
        <button onClick={props.fn} className={props.className}>{props.children}</button>
    )
}

export default Btn