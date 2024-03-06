import Image from 'next/image';

const EventDetail = () => {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl bg-gray-50">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Ini Judul
        </h1>
        <div className="flex flex-row items-center gap-2">
          <div className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
            <Image
              className="h-8 w-8 rounded-full"
              src="https://avatar.vercel.sh/3"
              height={32}
              width={32}
              alt={`avatar`}
            />
          </div>
          <div>
            <h1 className="text-md font-bold tracking-tight text-gray-900">
              Anonymous User
            </h1>
          </div>
        </div>
        <p className="text-sm text-gray-900">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aliquid
          reprehenderit ipsa expedita perferendis amet, neque soluta officia,
          aliquam at fugiat temporibus maiores consequuntur voluptatum quisquam
          eveniet, architecto obcaecati possimus?
        </p>
        <hr className="h-px my-4 border-0 bg-gray-300"></hr>
        <h1 className="text-md font-bold tracking-tight text-gray-900">
          Comments
        </h1>
      </div>
    </main>
  );
};

export default EventDetail;
