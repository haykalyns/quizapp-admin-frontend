import { useNavigate } from "react-router-dom";
import useCustomHook from "../../Hooks/customHook";
import { Muitable } from "../../Components/Atoms";

export default function Home() {
  let navigate = useNavigate();

  useCustomHook(10);

  const navigateToAddQuiz = () => {
    navigate("/addquiz");
  };

  return (
    <div className="px-[10%] pb-20 w-full min-h-screen">
      <div className="flex justify-center items-center pt-32">
        <button
          className="btn bg-green-500 mb-4 mr-4"
          onClick={navigateToAddQuiz}
        >
          Tambah Quiz
        </button>
        <button className="btn  bg-yellow-500 mb-4 mr-4">Edit Quiz</button>
        <button className="btn bg-blue-500 mb-4">Lihat Quiz</button>
      </div>
      <Muitable />
    </div>
  );
}
