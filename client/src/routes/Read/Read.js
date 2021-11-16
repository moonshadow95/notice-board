import React, {useEffect, useState} from 'react';
import { useParams} from "react-router-dom";
import Selected from "../../components/Selected/Selected";
import NotFound from "../NotFound/NotFound";
import styles from './read.module.css';

const Read = ({viewContent}) => {
    const [selected, setSelected] = useState();
    const [loading, setLoading] = useState(true)
    const {id} = useParams();
    useEffect(()=>{
        setSelected(viewContent.find((item)=> item.id === parseInt(id)))
        setLoading(prev=>!prev)
    },[id])

    return (
        loading ?
            <div className={styles.container}>
                <div className={styles.spinner}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>:
            selected ? <Selected selected={selected}/> :
                <NotFound />
    );
}

export default Read;