import LineChart from "./LineChart.js"
import MapChart from "./map.js"
import "./style.css"
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
    { timestamp: "Jan", value: 67.5 },
    { timestamp: "Feb", value: 50 },
    { timestamp: "Mar", value: 52.5 },
    { timestamp: "Apr", value: 39 },
    { timestamp: "May", value: 54 },
    { timestamp: "Jun", value: 56.25 },
    { timestamp: "Jul", value: 58.75 },
    { timestamp: "Aug", value: 81.25 },
    { timestamp: "Sep", value: 58.75 },
    { timestamp: "Oct", value: 56.25 },
    { timestamp: "Nov", value: 34 },
    { timestamp: "Dec", value: 62.5 },
    // ...
  ]

  const data2 = [
    { timestamp: "Jan", value: 23 },
    { timestamp: "Feb", value: 28 },
    { timestamp: "Mar", value: 34 },
    { timestamp: "Apr", value: 27 },
    { timestamp: "May", value: 33 },
    { timestamp: "Jun", value: 27 },
    { timestamp: "Jul", value: 30 },
    { timestamp: "Aug", value: 32 },
    { timestamp: "Sep", value: 35 },
    { timestamp: "Oct", value: 31 },
    { timestamp: "Nov", value: 28 },
    { timestamp: "Dec", value: 27 },
  ]

  return (
    <div className="flex items-center mx-auto bg-indigo-100">
      <div className="flex w-3/4 h-1/2 mx-auto mt-16 border-gray-200 border shadow flex-col mb-16 bg-white">
        <div class="flex items-center py-2 px-4 border-gray-200 border-b-2 justify-center">
          <div class="flex gap-1">
            <span class="w-2 h-2 bg-gray-200 rounded-full"></span>
            <span class="w-2 h-2 bg-gray-200 rounded-full"></span>
            <span class="w-2 h-2 bg-gray-200 rounded-full"></span>
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
            <div className="graph-button p-2 flex items-center bg-transparent hover:p-2 hover:bg-indigo-100 hover:rounded hover:cursor-pointer">
              <svg
                className="h-8 w-auto btn-svg "
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
              <div class="mt-4 px-4 h-[300px]">
                <div class="w-full">
                  <LineChart
                    data={data1}
                    chartId={`chart-1`}
                    backgroundColor={"#e4e8fb"}
                    borderColor={"#637bee"}
                  />
                </div>
                <div className="footer flex justify-between w-full items-center mt-4 px-2">
                  <div className="left-footer text-xl flex flex-col ">
                    CCV <div className="text-base text-gray-500">90.47K</div>
                  </div>
                  <div className="flex gap-1 items-center self-end">
                    <svg
                      className="stroke-green-400"
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
                      <line x1="12" y1="19" x2="12" y2="5"></line>
                      <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                    <div className="text-green-400 text-xl font-medium self-end">
                      +10K
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="graph-card-2 rounded-lg border border-gray-200 bg-white shadow">
              <div class="flex items-center justify-between px-4 pt-4">
                <div class="text-sm">Exits Before Video Starts</div>

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
              <div class="mt-4 px-4 h-[300px]">
                <div class="w-full">
                  <LineChart
                    data={data2}
                    chartId={`chart-2`}
                    backgroundColor={"#fcf1e2"}
                    borderColor={"#efa025"}
                  />
                </div>
                <div className="footer flex justify-between w-full items-center mt-4 px-2">
                  <div className="left-footer text-xl flex flex-col ">
                    By CCV <div className="text-base text-gray-500">0.25%</div>
                  </div>
                  <div className="flex gap-1 items-center self-end">
                    <svg
                      className="stroke-green-400"
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
                      <line x1="12" y1="19" x2="12" y2="5"></line>
                      <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                    <div className="text-green-400 text-xl font-medium self-end">
                      +0.05
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="map-card col-span-2 rounded-lg  bg-blue-50 shadow relative">
              <div class="flex h-full overflow-auto justify-center">
                <MapChart />
              </div>
              <div className="zoom buttons flex gap-2 absolute bottom-0 left-0 p-4">
                <div className="bg-white border border-gray text-gray-600 text-2xl font-bold h-10 w-10 text-center rounded text-indigo-700 hover:cursor-pointer hover:bg-[#2f56ce] hover:text-white">
                  +
                </div>
                <div className="bg-white border border-gray text-gray-600 text-3xl font-bold h-10 w-10 text-center rounded text-indigo-700 hover:cursor-pointer hover:bg-[#2f56ce] hover:text-white">
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
