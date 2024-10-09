import './App.css';
import {useEffect, useState} from 'react'
function App() {
  const [page, setpage] = useState(1);
  const [products, setproducts] = useState([]);
  const fetchProducts = async ()=>{
    const res = await fetch(`https://dummyjson.com/products?`)//limit=10&skip=${page*10-10}
    const data = await res.json();
    console.log(data)
    if(data && data.products){
      setproducts(data.products)
    }
  };
  useEffect(() => {
    fetchProducts()
    return () => {
      
    };
  }, []);
  const selectPageHandler=(selectedPage)=>{
    if(selectedPage>=1 && selectedPage<=products.length/10 && selectedPage!==page)
               setpage(selectedPage)

  }
  return (
    <div className="app">
      {products.length>0 && (
        <div className='products'>
          {products.slice(page*10-10,page*10).map((prod)=>{
            return (<span className='products__single' key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title}/>
            </span>)
          })}
        </div>
      )}
      {
        products.length>0 && <div className='pagination'>
        <span className={page > 1 ? "" : "pagination__disable"} onClick={() => selectPageHandler(page - 1)}> -</span>
        {
          [...Array(products.length/10)].map((r,i)=>{
            return <span className={page===i+1 ?"pagination__selected":""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
          })
        }
       
        <span className={page <products.length/10 ? "" : "pagination__disable"} onClick={() => selectPageHandler(page + 1)}>+</span>
        </div>
      }
    </div>
  );
}

export default App;
