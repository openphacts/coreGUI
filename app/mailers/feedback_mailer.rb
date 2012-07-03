class FeedbackMailer < ActionMailer::Base
  default :from => "openphactscoregui@gmail.com"
  default :bcc => ["james.eales@manchester.ac.uk", "ramgolam@aqnowledge.com", "bugs@openphacts.org"]
  #, "bugs@openphacts.org"
  default :subject => "[coregui-feedback] New CoreGUI user feedback"
  default :reply_to => "bugs@openphacts.org"
  # @param [String] feedbackText
  # @param [String] userEmail
  # @param [String] technicalInfo
  def feedback_email(feedbackText, userEmail, technicalInfo)
    @feedbackData = {:text => feedbackText, :email => userEmail, :techInfo => technicalInfo}
    mail(:to => userEmail)
  end
end
