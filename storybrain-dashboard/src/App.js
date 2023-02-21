import LineChart from "./LineChart.js"
import MapChart from "./map.js"
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

  const data1 = [
    { timestamp: "Jan", value: 10 },
    { timestamp: "Feb", value: 20 },
    { timestamp: "Mar", value: 30 },
    { timestamp: "Apr", value: 25 },
    { timestamp: "May", value: 35 },
    { timestamp: "Jun", value: 40 },
    { timestamp: "Jul", value: 45 },
    { timestamp: "Aug", value: 50 },
    { timestamp: "Sep", value: 45 },
    { timestamp: "Oct", value: 40 },
    { timestamp: "Nov", value: 35 },
    { timestamp: "Dec", value: 30 },
    // ...
  ]

  const data2 = [
    { timestamp: "Jan", value: 20 },
    { timestamp: "Feb", value: 22 },
    { timestamp: "Mar", value: 24 },
    { timestamp: "Apr", value: 26 },
    { timestamp: "May", value: 28 },
    { timestamp: "Jun", value: 30 },
    { timestamp: "Jul", value: 32 },
    { timestamp: "Aug", value: 34 },
    { timestamp: "Sep", value: 36 },
    { timestamp: "Oct", value: 38 },
    { timestamp: "Nov", value: 42 },
    { timestamp: "Dec", value: 48 },
    // ...
  ]

  return (
    <div className="flex items-center mx-auto">
      <div className="flex w-3/4 h-3/4 mx-auto mt-16 border-black border flex-col mb-16">
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
          <div className="side-nav flex flex-col items-center px-4 pt-6 gap-6 bg-gray-100">
            <svg
              width="20"
              viewBox="0 0 84 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-auto"
            >
              <path
                d="M19.9787 18C18.8729 18 17.9766 18.8954 17.9766 20C17.9766 21.1046 18.8729 22 19.9787 22H37.9979C39.1036 22 40 22.8954 40 24V38C40 39.1046 39.1036 40 37.9979 40H19.9787C6.18956 40 -3.52882 25.6809 1.21942 12.996C4.06098 5.40477 11.388 0 19.9787 0H37.9979C39.1036 0 40 0.895429 40 2V16C40 17.1046 39.1036 18 37.9979 18H19.9787Z"
                fill="black"
              ></path>
              <path
                d="M37.9979 62C39.1036 62 40 61.1046 40 60V46C40 44.8954 39.1036 44 37.9979 44H19.9787C12.3896 44 5.62239 40.4851 1.21942 34.996C-3.52881 47.6809 6.18956 62 19.9787 62H37.9979Z"
                fill="black"
              ></path>
              <path
                d="M46.0021 0C44.8964 0 44 0.895429 44 2V16C44 17.1046 44.8964 18 46.0021 18H64.0213C71.6104 18 78.3776 21.5149 82.7806 27.004C87.5288 14.3191 77.8104 0 64.0213 0H46.0021Z"
                fill="black"
              ></path>
              <path
                d="M64.0213 44C65.1271 44 66.0234 43.1046 66.0234 42C66.0234 40.8954 65.1271 40 64.0213 40H46.0021C44.8964 40 44 39.1046 44 38V24C44 22.8954 44.8964 22 46.0021 22H64.0213C77.8104 22 87.5288 36.3191 82.7806 49.004C79.939 56.5952 72.612 62 64.0213 62H46.0021C44.8964 62 44 61.1046 44 60V46C44 44.8954 44.8964 44 46.0021 44H64.0213Z"
                fill="black"
              ></path>
            </svg>
            <div className="graph-button p-2 flex items-center bg-transparent hover:p-2 hover:bg-purple-300 hover:rounded hover:cursor-pointer">
              <svg
                className="h-8 w-auto "
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 3v18h18"></path>
                <path d="M13 17V9"></path>
                <path d="M18 17V5"></path>
                <path d="M8 17v-3"></path>
              </svg>
            </div>
          </div>
          <div className="graph-map grid grid-cols-2 gap-8 p-6 flex-1 w-full">
            <div class="graph-card-1 flex flex-col rounded-lg border border-gray-200 bg-white shadow">
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
              <div class="mt-10 px-4 h-[300px]">
                <div class="w-full">
                  <LineChart data={data1} chartId={`chart-1`} />
                </div>
                <div className="footer flex justify-between w-full items-center mt-4 px-2">
                  <div className="left-footer text-xl flex flex-col ">
                    CCV <div className="text-base text-gray-500">90.47K</div>
                  </div>
                  <div className="text-green-300 text-xl font-medium self-end">
                    +10K
                  </div>
                </div>
              </div>
            </div>
            <div class="graph-card-2 rounded-lg border border-gray-200 bg-white shadow">
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
              <div class="mt-10 px-4 h-[300px]">
                <div class="w-full">
                  <LineChart data={data2} chartId={`chart-2`} />
                </div>
                <div className="footer flex justify-between w-full items-center mt-4 px-2">
                  <div className="left-footer text-xl flex flex-col ">
                    By CCV <div className="text-base text-gray-500">0.25%</div>
                  </div>
                  <div className="text-green-300 text-xl font-medium self-end">
                    +0.05
                  </div>
                </div>
              </div>
            </div>
            <div class="map-card col-span-2 rounded-lg h-[400px] bg-purple-50 shadow relative">
              <div class="flex h-full overflow-auto  justify-center">
                <MapChart />
              </div>
              <div className="zoom buttons flex gap-2 absolute bottom-0 left-0 p-4">
                <div className="bg-purple-200 text-2xl font-bold h-10 w-10 text-center rounded text-indigo-700 hover:cursor-pointer hover:bg-purple-900 hover:text-white">
                  +
                </div>
                <div className="bg-purple-200 text-3xl font-bold h-10 w-10 text-center rounded text-indigo-700 hover:cursor-pointer hover:bg-purple-900 hover:text-white">
                  -
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[350px] my-6 mr-4 rounded-lg overflow-y-auto border border-gray-100">
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
