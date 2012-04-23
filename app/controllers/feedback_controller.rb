class FeedbackController < ApplicationController

  def index
    respond_to do |format|
      email = FeedbackMailer.feedback_email(params[:feedbackText], params[:userEmail], params[:technicalInfo])
      puts "========================================="
      puts email.to_s
      puts "========================================="
      email.deliver
      format.json { render :json => {:message => "Your feedback has been sent to the core GUI developers"} }
    end
  end
end
