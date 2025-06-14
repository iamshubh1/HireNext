import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai']
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer']
  },
  {
    filterType: 'Salary',
    array: ['0-40k', '42-1lakh', '1lakh to 5lakh']
  }
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])

  return (
    <div className="w-full bg-white dark:bg-[#1e1e2f] rounded-xl shadow-md p-6 transition-all">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index} className="bg-gray-100 dark:bg-[#2d2d3f] p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">{data.filterType}</h2>
            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`
                return (
                  <div key={itemId} className="flex items-center space-x-3">
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="text-indigo-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-400"
                    />
                    <Label
                      htmlFor={itemId}
                      className="text-gray-800 dark:text-gray-100 cursor-pointer hover:text-indigo-600 transition"
                    >
                      {item}
                    </Label>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard
