import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { List } from '../components/List'
import { Card } from '../components/Card'
import { Controls } from '../components/Controls'
import {
	selectCountriesInfo,
	selectVisibleCountries,
} from '../store/countries/countriesSelectors'
import { loadCountries } from '../store/countries/countriesActions'
import { selectControls } from '../store/controls/controlsSelectors'

const HomePage = () => {
	const navigate = useNavigate()

	const dispatch = useDispatch()
	// const countries = useSelector(selectAllCountries)

	const { search, region } = useSelector(selectControls)
	const countries = useSelector((state) =>
		selectVisibleCountries(state, { search, region })
	)
	const { status, error, qty } = useSelector(selectCountriesInfo)

	useEffect(() => {
		if (!qty) {
			dispatch(loadCountries())
		}
	}, [qty, dispatch])

	return (
		<>
			<Controls />

			{error && <h2>Can't fetch data</h2>}

			{status === 'loading' && <h1>Loading...</h1>}

			{status === 'received' && (
				<List>
					{countries.map((c) => {
						const countryInfo = {
							img: c.flags.png,
							name: c.name,
							info: [
								{
									title: 'Population',
									description: c.population.toLocaleString(),
								},
								{
									title: 'Region',
									description: c.region,
								},
								{
									title: 'Capital',
									description: c.capital,
								},
							],
						}

						return (
							<Card
								key={c.name}
								onClick={() => navigate(`/country/${c.name}`)}
								{...countryInfo}
							/>
						)
					})}
				</List>
			)}
		</>
	)
}

export default HomePage
