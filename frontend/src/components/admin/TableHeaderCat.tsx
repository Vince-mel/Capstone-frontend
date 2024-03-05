function TableHeaderCat() {
    return (
        <div className="text-center ">
            <div className="grid grid-cols-3  lg:grid-cols-5 ">
                <div className="border border-gray-200 bg-gray-500 text-white py-3 text-center">
                    <p>Id</p>
                </div>
                <div className="border   hidden lg:block border-gray-200 bg-gray-500 text-white py-3 text-center">
                    <p>Nome</p>
                </div>
                <div className="border border-gray-200 bg-gray-500 text-white py-3 text-center">
                    <p>Descrizione</p>
                </div>
                <div className="border  hidden lg:block border-gray-200 bg-gray-500 text-white py-3 text-center">
                    <p>Azioni</p>
                </div>
                
            </div>
        </div>
    );
}

export default TableHeaderCat;
