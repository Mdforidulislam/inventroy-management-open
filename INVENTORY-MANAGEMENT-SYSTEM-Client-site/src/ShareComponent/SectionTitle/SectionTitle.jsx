

const SectionTitle = ({title, description}) => {
    return (
        <div className="space-y-3">
            <h1 className="text-3xl text-center font-semibold ">{title}</h1>
             <p  className="text-sm font-semibold text-center">{description}</p> 
             <hr className="w-2/4 mx-auto h-2"></hr>
        </div>
    );
};

export default SectionTitle;