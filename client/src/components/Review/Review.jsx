import style from "./Review.module.css";




const Review = ({datasXProduc}) =>{
    
    const {comment,calificacion} = datasXProduc;

    return (
        <div className={style.content}>
            <div className={style.boxTop}>
                <div className={style.user}>
                    <div className={style.imageUser}>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="user" />
                    </div>
                    <div className={style.nameUser}>
                        <strong>Carlos</strong>
                    </div>
                </div>
                <div className={style.calification}>
                    <p>{calificacion}</p>
                </div>
            </div>
            <div className={style.comment}>
                <p>{comment}</p>
            </div>
        </div>
    );
}

export default Review;