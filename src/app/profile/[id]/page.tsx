
const page = ({params}: any) => {
  return (
    <div>
      <div className="flex justify-center flex-col gap-4 items-center min-h-screen">
        <h3>Profile page</h3>
        <h5 className="bg-green-800 text-white p-3">{params.id}</h5>
      </div>
    </div>
  )
}

export default page
