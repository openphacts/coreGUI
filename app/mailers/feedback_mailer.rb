class FeedbackMailer < ActionMailer::Base
  default :from => "openphactscoregui@gmail.com"
  #default :to => ["testing@openphacts.org", "bugs@openphacts.org", "james.eales@manchester.ac.uk", "ramgolam@aqnowledge.com"]
  default :to => ["james.eales@manchester.ac.uk", "jeales@gmail.com", "ramgolam@aqnowledge.com"]
  default :subject => "[coregui-feedback] New CoreGUI user feedback"
  # @param [String] feedbackText
  # @param [String] userEmail
  # @param [String] technicalInfo
  def feedback_email(feedbackText, userEmail, technicalInfo)
    @feedbackData = {:text => feedbackText, :email => userEmail, :techInfo => technicalInfo}
    mail
  end
end
