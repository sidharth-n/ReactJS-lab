function App() {
  const topTitles = [
    [`iPhone 13 Pro`, "1,784"],
    [`Moto G3`, "564"],
    [`Rado Watch 3.0`, "342"],
    [`Redmi note 10 Pro`, "567"],
    [`Redmi 11s`, "768"],
    [`Sony PS5`, "657"],
    [`Pure leather Duffle Bag`, "455"],
    [`Kitchen Timer`, "667"],
    [`Quechua Water Bottle`, "887"],
    [`Samsung Deep Cool`, "990"],
    [`Kids Slidey Willow`, "1,000"],
    [`Deep Clean Gel`, "1,321"],
    [`Black Marker`, "321"],
    [`MacBook Air`, "445"],
    [`IdeaPad`, "556"],
  ]

  return (
    <div className="flex items-center mx-auto">
      <div className="flex w-3/4 h-3/4 mx-auto mt-16 border-black border flex-col">
        <div class="flex items-center py-2 px-4 border-gray-400 border justify-center">
          <div class="flex gap-1">
            <span class="w-3 h-3 bg-gray-200 rounded-full"></span>
            <span class="w-3 h-3 bg-gray-200 rounded-full"></span>
            <span class="w-3 h-3 bg-gray-200 rounded-full"></span>
          </div>
          <div class="flex items-center justify-center flex-1 px-2">
            <div class="border border-gray-100 rounded bg-gray-100 text-sm px-32 py-1 text-gray-500">
              storybrain.com
            </div>
          </div>
        </div>

        <div className="main-container flex h-full ">
          <div className="side-nav flex flex-col px-4 pt-4 gap-4 bg-gray-100">
            <div className="logo w-6 h-6 rounded-full bg-red-400"></div>
            <div className="logo w-6 h-6 rounded-full bg-red-400"></div>
          </div>
          <div className="graph-map grid grid-cols-2 gap-8 p-6 flex-1">
            <div class="graph-card-1 w-full rounded-lg border border-gray-200 bg-white shadow">
              <div class="flex items-center justify-between px-4 pt-4">
                <div class="text-sm">Current Concurrent Viewers</div>

                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  class="inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:rounded-full hover:bg-gray-100 focus:outline-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    viewBox="0 0 24 24"
                    fill="grey"
                    stroke="grey"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
              </div>
              <div class="mt-10 flex flex-col items-center pb-10">
                <div class="text-sm">graph to be added</div>
              </div>
            </div>
            <div class="graph-card-2 w-full rounded-lg border border-gray-200 bg-white shadow">
              <div class="flex items-center justify-between px-4 pt-4">
                <div class="text-sm">Current Concurrent Viewers</div>

                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  class="inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:rounded-full hover:bg-gray-100 focus:outline-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    viewBox="0 0 24 24"
                    fill="grey"
                    stroke="grey"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
              </div>
              <div class="mt-10 flex flex-col items-center pb-10">
                <div class="text-sm">graph to be added</div>
              </div>
            </div>
            <div class="map-card col-span-2 rounded-lg   border border-gray-200 bg-white shadow">
              <div class="mt-10 flex flex-col items-center pb-10">
                <div class="text-sm">map</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[350px] my-6 mr-4 rounded-lg overflow-y-auto h-3/4  border border-gray-100">
            <div className="px-4 text-sm pt-4 pb-8 bg-gray-100 ">
              Top Titles By CCV
            </div>
            {topTitles.map((product, index) => (
              <div
                className={`flex justify-between  p-4 items-center ${
                  index % 2 !== 0 ? `bg-gray-100` : `bg-white`
                } `}
              >
                <div className={`text-sm rounded-lg text-gray-500`}>
                  {product[0]}
                </div>
                <div className="text-sm text-gray-500">{product[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
