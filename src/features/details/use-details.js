import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDetails, loadCountryByName, clearDetails } from './details-slice'

export const useDetails = (name) => {
	const dispath = useDispatch()

	const details = useSelector(selectDetails)

	useEffect(() => {
		dispath(loadCountryByName(name))
		return () => {
			dispath(clearDetails())
		}
	}, [name, dispath])

	return details
}
