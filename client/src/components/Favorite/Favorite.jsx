import styles from "./Favorite.module.css";

import {useSortable} from "@dnd-kit/sortable";

import {CSS} from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

const Favorite = ({favorite}) =>{

    const { name, image, description, price, id } = favorite;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id:favorite.id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div
        style={style} 
        ref={setNodeRef}
        {...attributes}
        {...listeners}

        className={styles.container}>
            <div className={styles.cardCont}>
            <div className={styles.imageCont}>
                <img className={styles.image} src={image} alt="product" />
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.content}>
                <h4 className={styles.name}>{name}</h4>
                <Link to={`/home/${id}`} target="_blank">
                    <FaExternalLinkAlt/>
                </Link>
            </div>
            <p className={styles.price}>${price}</p>
            </div>
        </div>
    );
}

export default Favorite;