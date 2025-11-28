import  { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const type = useRef();
  const [form, setform] = useState({
    url: "",
    site: "",
    userName: "",
    password: "",
  });

  const [passwordArray, setpasswordArray] = useState([]);
  const [contex, setcontex] = useState("");

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let password = await req.json();
    setpasswordArray(password);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("show.svg")) {
      ref.current.src = "hide.svg";
      type.current.type = "password";
    } else {
      ref.current.src = "show.svg";
      type.current.type = "text";
    }
  };

  const savePassword = async () => {
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });

    setform({ url: "", site: "", userName: "", password: "" });
    popUp("Password Added Sucessfully");
  };

 const editPassword = async (id) => {
   const selectedItem = passwordArray.find((item) => item.id === id);
   if (!selectedItem) return;

   setform({ ...selectedItem });

   await fetch("http://localhost:3000/", {
     method: "DELETE",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ id }),
   });

   setpasswordArray((prev) => prev.filter((item) => item.id !== id));
 };

  const deletePassword = async (id) => {
    let boolean = confirm("Do you really want to delete this password???");

    if (boolean) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });
      popUp("Password Deleted");
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const popUp = (content) => {
    setcontex(content);
    document.querySelector(".popUp").classList.remove("opacity-0");
    document.querySelector(".popUp").classList.remove("-top-12");
    document.querySelector(".popUp").classList.add("opacity-100");
    document.querySelector(".popUp").classList.add("top-16");

    const bar = setInterval(() => {
      let width = document.querySelector(".bar").style.width;
      width = parseInt(width) + 1;
      document.querySelector(".bar").style.width = `${width}%`;
    }, 15);

    setTimeout(() => {
      document.querySelector(".popUp").classList.remove("opacity-100");
      document.querySelector(".popUp").classList.remove("top-16");
      document.querySelector(".popUp").classList.add("opacity-0");
      document.querySelector(".popUp").classList.add("-top-12");
      document.querySelector(".bar").style.width = 0;
      clearInterval(bar);
    }, 1500);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    popUp("Copied Text Sucessfully");
  };

  return (
    <>
      <div className="popUp flex opacity-0 -top-12 justify-center items-center absolute ml-[50vw] w-96 -translate-x-1/2 h-12 p-4 bg-slate-800 text-white font-bold cursor-default duration-300">
        {contex}
        <div
          className="bar absolute bottom-0 h-[3px] bg-blue-700 left-0"
          style={{ width: "0" }}
        ></div>
      </div>

      <div className="container mx-auto max-w-5xl font-semibold">
        <div className="header flex justify-between md:px-6 my-4 w-11/12">
          <div className="logo font-bold md:text-xl ml-6">
            <span className="text-green-700">&lt;</span>
            <span className="text-white">Pass</span>
            <span className="text-green-700">Safe /&gt;</span>
          </div>
          <p className="text-white font-thin md:text-xl lg:text-2xl text-sm">
            This is your Personal{" "}
            <span className="text-green-700">Password Manager</span>
          </p>
        </div>
        <div className="flex flex-col gap-6 p-4 text-black">
          <div className="w-full flex flex-col md:flex-row justify-evenly gap-6">
            <input
              type="text"
              className="rounded-xl border border-green-500 px-6 py-1 outline-none focus:border-green-300 md:w-5/12"
              name="site"
              id="site"
              placeholder="Site Name"
              value={form.site}
              onChange={handleChange}
            />
            <input
              type="text"
              className="rounded-xl border border-green-500 px-6 py-1 outline-none focus:border-green-300 md:w-5/12"
              name="url"
              id="url"
              placeholder="Url"
              value={form.url}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-6 md:flex-row w-full justify-evenly">
            <input
              type="text"
              className="rounded-xl border border-green-500 px-6 py-1 outline-none focus:border-green-300 md:w-5/12"
              name="userName"
              id="UserName"
              placeholder="User Name"
              value={form.userName}
              onChange={handleChange}
            />

            <div className="md:relative md:w-5/12">
              <input
                type="Password"
                className="rounded-xl border border-green-500 px-6 md:pr-12 py-1 outline-none focus:border-green-300 w-full"
                name="password"
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                ref={type}
              />
              <span
                className="absolute right-6 top-[18.75rem] md:right-3 md:top-1 hover:cursor-pointer"
                onClick={showPassword}
              >
                <img src="hide.svg" alt="eye" ref={ref} />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="bg-green-500 hover:bg-green-300 gap-2 transition-all flex justify-center items-center rounded-full px-4 py-2 w-fit mx-auto border-2 border-green-300 hover:border-green-950 disabled:opacity-40"
            disabled={
              form.site < 1 ||
              form.password < 1 ||
              form.userName < 1 ||
              form.url < 1
            }
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="loop-on-hover"
              delay="250"
            ></lord-icon>
            Add PassWord
          </button>
        </div>
      </div>

      <div className="display md:mx-40 min-h-[42vh]">
        <h2 className="text-white text-center font-extrabold text-xl">
          Your Pass
          <span className="text-green-700">Words</span>
        </h2>
        {passwordArray.length === 0 ? (
          <p className="text-white font-bold text-2xl text-center mt-8">
            No <span className="text-green-700">PassWords</span> Added Yet
          </p>
        ) : null}

        {passwordArray.length != 0 ? (
          <table className="table-auto m-1 text-lg rounded-2xl overflow-hidden text-white w-full bg-green-200">
            <thead>
              <tr className="border bg-green-600">
                <th className="text-center border border-black p-2">Site</th>
                <th className="text-center border border-black p-2">
                  User Name
                </th>
                <th className="text-center border border-black p-2">
                  Password
                </th>
                <th className="text-center border border-black p-2">Actions</th>
              </tr>
            </thead>
            <tbody className="border border-black">
              {passwordArray.map((item, index) => (
                <>
                  <tr key={index}>
                    <td className="p-1 border border-black text-black font-semibold text-center">
                      <a href={item.url} target="_blank">
                        {item.site}
                      </a>
                    </td>
                    <td className="p-1 border border-black text-black font-semibold text-center">
                      <div className="flex px-4 justify-between">
                        {item.userName}
                        <div
                          className="cursor-pointer w-6"
                          onClick={() => {
                            copyText(item.userName);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="p-1 border border-black text-black font-semibold text-center">
                      <div className="flex px-4 justify-between">
                        {"*".repeat(item.password.length)}
                        <div
                          className="cursor-pointer w-6"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="p-1 border border-black text-black font-semibold text-center cursor-pointer">
                      <div className="flex justify-around">
                        <span onClick={() => editPassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wvdxdmpi.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                        <span onClick={() => deletePassword(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </>
  );
};

export default Manager;
