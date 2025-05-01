'use client'
import React, { Component } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default class Converter extends Component {
  state = {
    amount: 1,
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    exchangeRate: null,
    currencies: [],
    convertedAmount: null,
    loading: false,
    error: null,
  }

  componentDidMount() {
    this.fetchCurrencies()
  }

  fetchCurrencies = async () => {
    try {
      const res = await axios.get('https://open.er-api.com/v6/latest/USD')
      const currencyKeys = Object.keys(res.data.rates)
      this.setState({ currencies: currencyKeys }, () => {
        this.getRate()
      })
    } catch (error) {
      this.setState({ error: 'Failed to load currency list.' })
    }
  }

  getRate = async () => {
    const { fromCurrency, toCurrency } = this.state
    this.setState({ loading: true, error: null })

    try {
      const res = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      const rate = res.data.rates[toCurrency]
      this.setState({ exchangeRate: rate, loading: false }, this.calculate)
    } catch (error) {
      this.setState({ error: 'Conversion failed.', loading: false })
    }
  }

  calculate = () => {
    const { amount, exchangeRate } = this.state
    if (!exchangeRate) return
    const convertedAmount = (amount * exchangeRate).toFixed(2)
    this.setState({ convertedAmount })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.getRate)
  }

  render() {
    const {
      amount, fromCurrency, toCurrency, convertedAmount,
      currencies, loading, error
    } = this.state

    return (
      <div className=" min-h-screen bg-gradient-to-br from-blue-100 to-white p-8">
        <div className=" max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <title>Currency Converter</title>
          <h1 className=" text-3xl font-bold text-center text-blue-700">Currency Converter</h1>
          <div className=" space-y-4">
            <div>
              <label className="text-black block mb-1 font-medium">Amount</label>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={this.handleChange}
                className=" w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className=" flex gap-4">
              <div className=" flex-1">
                <label className="text-black block mb-1 font-medium">From</label>
                <select
                  name="fromCurrency"
                  value={fromCurrency}
                  onChange={this.handleChange}
                  className=" w-full p-2 border border-gray-300 rounded"
                >
                  {currencies.map(cur => (
                    <option key={cur} value={cur}>{cur}</option>
                  ))}
                </select>
              </div>

              <div className=" flex-1">
                <label className="text-black block mb-1 font-medium">To</label>
                <select
                  name="toCurrency"
                  value={toCurrency}
                  onChange={this.handleChange}
                  className=" w-full p-2 border border-gray-300 rounded"
                >
                  {currencies.map(cur => (
                    <option key={cur} value={cur}>{cur}</option>
                  ))}
                </select>
              </div>
            </div>

            {loading && <p className=" text-gray-500">Loading...</p>}
            {error && <p className=" text-red-500">{error}</p>}

            {convertedAmount && (
              <div className=" text-center mt-4">
                <p className=" text-lg text-black font-semibold text-blue-600">
                  {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                </p>
              </div>
            )}
          </div>

          <div className=" text-center mt-4">
            <Link href="/" className=" text-blue-500 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
