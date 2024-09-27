// ItemDetailContainer.jsx
import './ItemDetailContainer.css';
import ItemDetail from "./ItemDetail";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDoc, doc, getFirestore } from "firebase/firestore";
import Spinner from 'react-bootstrap/Spinner';

const ItemDetailContainer = () => {
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const onAdd = (q) => {
        console.log({
            q, item
        });
    };

    useEffect(() => {
        const db = getFirestore();
        const docRef = doc(db, "items", id);
        
        getDoc(docRef)
            .then((snapShot) => {
                setItem({
                    id: snapShot.id,
                    ...snapShot.data()
                });
            })
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <div>
            {loading ? ( 
                <Spinner animation="border" role="status" className="SpiNNer">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            ) : (
                <ItemDetail item={item} onAdd={onAdd} />
            )}
        </div>
    );
};

export default ItemDetailContainer;
