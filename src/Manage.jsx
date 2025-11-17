import { useEffect, useState } from "react";
import { deleteProduct, getProducts, updateProduct } from "./api";

function Manage(){

       var [products,setProducts]=useState([]);
      var fetchProducts=async()=>{
            var response=await getProducts();   
            setProducts(response.data);
        }
        var deleteMe=async(pid)=>{
            console.log(pid)
            await deleteProduct(pid);
            alert("deleted successfully")
            fetchProducts();         
        }
        var [formProduct,setForm]=useState({
            _id:"",
            productName:"",
            productPrice:"",
            productDescription:"",
            productCategory:"",
            productImage:""
        })
        var [pid,setPid]=useState(null);
        var updateContent=(product)=>{
            setPid(product._id);
            setForm({
                _id:product._id,
                productName:product.productName,
                productPrice:product.productPrice,
                productCategory:product.productCategory,
                productDescription:product.productDescription,
                productImage:product.productImage
            })
        }

        var updateNow=async()=>{
            console.log(pid)
          var response=  await updateProduct(pid,formProduct);
          alert(response.data.staus)
          fetchProducts()
        }

        useEffect(()=>{
            fetchProducts();
        },[])

         return(<>
    <h1>Manage Products</h1>
        <div className="row">
            {
            products.map((product)=>(
                <div className="col-md-4" key={product._id}>
                     <div className="card">
        <div className="card-header">
            <h1>{product.productName}</h1>
        </div>
        <div className="card-body">
            <p>Description : {product.productDescription}</p>
            <p>price : <span className="badge bg-primary">{product.productPrice}</span></p>
        </div>
        <div className="card-footer">
            <button className="btn btn-danger" onClick={()=>deleteMe(product._id)}>Delete</button>
            <button className="btn btn-warning" onClick={()=>updateContent(product)} data-bs-toggle="modal" data-bs-target="#updateModal">Update</button>
        </div>
    </div>
                </div>

               

            ))
        }
        </div>
            <div className="modal fade" id="updateModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="" className="form-label">product Name</label>
                                    <input type="text" name="" id="pname" value={formProduct.productName} onChange={(e)=>setForm({...formProduct,productName:e.target.value})} className="form-control"/>
                                </div>
                                 <div className="form-group">
                                    <label htmlFor="" className="form-label">product price</label>
                                    <input type="text" name="" id="pname" value={formProduct.productPrice} onChange={(e)=>setForm({...formProduct,productPrice:e.target.value})} className="form-control"/>
                                </div>
                                 <div className="form-group">
                                    <label htmlFor="" className="form-label">product Description</label>
                                    <input type="text" name="" id="pname" value={formProduct.productDescription} onChange={(e)=>setForm({...formProduct,productDescription:e.target.value})} className="form-control"/>
                                </div>
                                 <div className="form-group">
                                    <label htmlFor="" className="form-label">product Category</label>
                                    <input type="text" name="" id="pname" value={formProduct.productCategory} onChange={(e)=>setForm({...formProduct,productCategory:e.target.value})} className="form-control"/>
                                </div>
                                 <div className="form-group">
                                    <label htmlFor="" className="form-label">product Image</label>
                                    <input type="text" name="" id="pname" value={formProduct.productImage} onChange={(e)=>setForm({...formProduct,productImage:e.target.value})} className="form-control"/>
                                </div>
                                 
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success" onClick={updateNow} data-bs-dismiss="modal">Update Now</button>
                            </div>
                        </div>
                    </div>
                </div>
    </>)


}

export default Manage;