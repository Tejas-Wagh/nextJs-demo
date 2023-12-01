import classes from "./ShowDetail.module.css"
export default function ShowDetail(props){
    return <div className={classes.container}>
        <img src={props.image} alt={props.title}/>
        <h2>{props.title}</h2>
        <p>{props.address}</p>
    </div>
}