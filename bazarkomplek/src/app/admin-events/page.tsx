export default function AdminEventsPage() {
  const products = [1, 2, 3];
  return (
    <>
      <main className="flex min-h-screen flex-col p-10 ">
        <h1 className="text-xl text-center text-base-100 pb-5 font-bold">
          ADMIN Events
        </h1>
        <div className="overflow-x-auto">
          <table className="table text-base-100 border-2 border-base-100">
            <thead className="text-base-100">
              <tr className="">
                <th>No.</th>
                <th>Event</th>
                <th>Lapak</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            {products.map((e) => {
              return (
                <tbody key={e}>
                  <tr>
                    <td>{e}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Hart Hagerty</div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Zemlak, Daniel and Leannon
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>Purple</td>
                    <td>Purple</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </main>
    </>
  );
}
