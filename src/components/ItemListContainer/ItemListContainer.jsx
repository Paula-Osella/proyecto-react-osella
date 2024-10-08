import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import './ItemListContainer.css';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState, useContext} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import CartContext from "../Context/CartContext";

function ItemListContainer() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();
    const { addItem } = useContext(CartContext);


    useEffect(() => {
        setLoading(true);
        const db = getFirestore();
        const itemCollection = collection(db, "items");

        const itemQuery = categoryId
            ? query(itemCollection, where("category", "==", categoryId))
            : itemCollection;

        getDocs(itemQuery)
            .then((snapshot) => {
                setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    const onAdd = (item, quantity) => {
        addItem(item, quantity);
    };


    return (
        <div>
            <div className='Contenedor'>
                {loading ? (
                    <div className="Spinner">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </Spinner>
                    </div>
                ) : (
                    <ItemList items={items} onAdd={onAdd} />
                )}
            </div>
        </div>
    );
}

export default ItemListContainer;
