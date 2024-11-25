import React, { useEffect, useState } from 'react'
import Description from './Description/Description'
import Option from './Options/Option'
import Feedback from './Feedback/Feedback'
import Notification from './Notification/Notification'

const App = () => {
	const [feedback, setFeedback] = useState(() => JSON.parse(window.localStorage.getItem("feedback") ?? {good: 0,
		neutral: 0,
		bad: 0})
	)

	useEffect(() => { window.localStorage.setItem("feedback", JSON.stringify(feedback)) }, [feedback])
	
	const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
	const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100)

	const updateFeedback = updateFeedbackType => {
		setFeedback(prev => ({ ...prev, [updateFeedbackType]: prev[updateFeedbackType] + 1 }))
	}
	const resetFeedback = () => {
		setFeedback({
		good: 0,
		neutral: 0,
		bad: 0})
	}

	return (
		<div>
			<Description />
			<Option updateFeedback={updateFeedback} totalFeedback={totalFeedback} resetFeedback={resetFeedback} />
			{totalFeedback > 0 ? <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback} /> : <Notification/>}	
		</div>
	)
}

export default App