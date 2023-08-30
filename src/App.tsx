import Forecast from './components/Forecast'
import Search from './components/Search'
import useForecast from './components/hooks/useForecast'

const App = (): JSX.Element => {
  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast()
  return (
    <main className="flex justify-center bg-orange-200 items-center  h-full w-full">
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onsubmit={onSubmit}
        />
      )}
    </main>
  )
}

export default App

// bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400