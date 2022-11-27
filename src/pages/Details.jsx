import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { IoArrowBack } from 'react-icons/io5'

import { Button } from '../components/Button'
import { Info } from '../components/Info'
import { selectDetails } from '../store/details/detailsSelectors'
import {
	loadCountryByName,
	clearDetails,
} from '../store/details/detailsActions'

const Details = () => {
	const { name } = useParams()
	const navigate = useNavigate()

	const dispath = useDispatch()

	const { currentCountry, error, status } = useSelector(selectDetails)

	useEffect(() => {
		dispath(loadCountryByName(name))

		return () => {
			dispath(clearDetails())
		}
	}, [name, dispath])

	return (
		<div>
			<Button onClick={() => navigate(-1)}>
				<IoArrowBack /> Back
			</Button>
			{status === 'loading' && <h2>Loading...</h2>}
			{error && <h2>Error: {error}</h2>}
			{currentCountry && <Info push={navigate} {...currentCountry} />}
		</div>
	)
}

export default Details
