const HomCard = ({ amount, title }) => {
  return (
    <div className="border shadow-xl p-8 rounded-md bg-white w-[300px]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-500">${amount}</h1>
        <p className="text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default HomCard;
