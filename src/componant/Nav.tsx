
const Nav: React.FC = () => {

    return (
        <>
                <div className="w-full bg-white h-14 relative shadow-md rounded-xl p-3">
                    <h1 className="font-sans text-2xl ps-2 font-bold">EvenTo</h1>
                    <button >logout</button>
                </div>

                {/* <div className="w-full bg-white h-14 relative shadow-md rounded-xl p-3">
                    <ul className="flex space-x-52">
                        <li>
                            <h1  className="font-sans text-2xl ps-2 font-bold">EvenTo</h1>
                        </li>
                        <li>
                            <h3 onClick={e=>navigate("/admin/users")}>user</h3>

                        </li>
                        <li>
                             <h3 onClick={e=>navigate("/admin/organizers")}>orgnaizer</h3>
                        </li>
                        <li>
                             <h3 onClick={e=>navigate("/admin/Requests")}>Requests</h3>
                        </li>
                    </ul>
                    <div>
                        <button onClick={logout} className="bg-blue-400">Logout</button>
                    </div>
                </div>
            */}
           
        </>
    );
}

export default Nav;
