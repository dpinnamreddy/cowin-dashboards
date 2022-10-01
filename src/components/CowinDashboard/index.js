// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

class CowinDashboard extends Component {
  state = {
    data: '',
    isSuccess: true,
    isLoading: true,
  }

  componentDidMount() {
    this.getCowinData()
  }

  getCowinData = async () => {
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({data: updatedData, isSuccess: true, isLoading: false})
    } else {
      this.setState({isSuccess: false, isLoading: false})
    }
  }

  render() {
    const {data, isSuccess, isLoading} = this.state
    return (
      <div className="container">
        {isLoading ? (
          <div className="loader" testid="loader">
            <Loader />
          </div>
        ) : (
          <>
            <div className="logo">
              <img
                src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
                alt="website logo"
                className="logo-img"
              />
              <p>Co-WIN</p>
            </div>
            <h1>CoWIN Vaccination in India</h1>
            {isSuccess ? (
              <>
                <VaccinationCoverage details={data.last7DaysVaccination} />
                <VaccinationByGender details={data.vaccinationByAge} />
                <VaccinationByAge details={data.vaccinationByGender} />
              </>
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
                alt="failure view"
              />
            )}
          </>
        )}
      </div>
    )
  }
}

export default CowinDashboard
