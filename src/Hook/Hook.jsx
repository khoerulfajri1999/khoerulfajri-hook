import { useState, useEffect } from "react";
import { Form } from "react-bootstrap"

const Hook = () => {
    const [state, setState] = useState([]);
    const [search, setSearch] = useState("")
    const getArticles = async (param) => {
        let api =
            param != undefined
                ? `https://newsapi.org/v2/top-headlines?q=${search}&country=id&apiKey=63269bae99df4dfd964c3ce1d44b710e`
                : "https://newsapi.org/v2/top-headlines?country=id&apiKey=63269bae99df4dfd964c3ce1d44b710e";
        let datax = await fetch(api);
        let data = await datax.json();
        return setState(data.articles);
    };

    useEffect(() => {
        getArticles(search);
    }, [search]);

    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-danger bg-danger">
                    <div className="container-fluid">
                        <a className="navbar-brand text-white" href="#">News App</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <form className="d-flex">
                                <Form.Control
                                    size="lg"
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="search keyword"
                                />
                            </form>
                        </div>
                    </div>
                </nav>
            </div><br />
            <div className="container-fluid">
                <div className="row">
                    {
                        state.map((item, index) => {
                            return (
                                <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                                    <div className="card">
                                        <img className="card-img-top" src={item?.urlToImage} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{item?.title}</h5>
                                            <h6>{new Date(item?.publishedAt).toString()}</h6>
                                            <p className="card-text">{item?.description}</p>
                                            <a href={item?.url} className="btn btn-primary">Baca Selengkapnya..</a>
                                        </div>
                                    </div>
                                </div>
                            ) 
                                
                            }) 
                        }
                </div>
            </div>
        </div>
    )
}

export default Hook;