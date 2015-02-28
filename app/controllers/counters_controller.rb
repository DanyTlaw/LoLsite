class CountersController < ApplicationController
  before_action :autheticate_user!
  before_action :set_counter, only: [:show, :edit, :update, :destroy, :upvote, :downvote]
  before_filter :load_parent
  # GET /counters
  # GET /counters.json
  def index
    @counters = @champion.counters.all
  end

  # GET /counters/1
  # GET /counters/1.json
  def show
    @counter = @champion.counters.find(params[:champion_id])
  end

  # GET /counters/new
  def new
    @counter = @champion.counters.build
  end

  # GET /counters/1/edit
  def edit
    @counter = @champion.counters.find(params[:champion_id])
  end

  # POST /counters
  # POST /counters.json
  def create
    @counter = @champion.counters.new(counter_params)
  #  all_champs = Counter.where(champ_name: @champion.name)
  #  if Counter.exists?(champ_name: @champion.name, champ_gegner: @counter.champ_gegner)
  #      @counter = Counter.find_by(champ_gegner: @counter.champ_gegner)
  #      @counter.increment!(:weak)
  #    
  #  else
  #    @counter.strong = (@counter.strong ? 1 : 0)
  # @counter.weak = (@counter.weak ? 0 : 1)
      @counter.champ_name = @champion.name

  #  end

    if @counter.save
      redirect_to(:back)
    else
      render ('new')
    end
  end

  # PATCH/PUT /counters/1
  # PATCH/PUT /counters/1.json
  def update

    @counter = @champion.counters.find(params[:id])

    respond_to do |format|
      if @counter.update(counter_params)
        format.html { redirect_to @counter, notice: 'Counter was successfully updated.' }
        format.json { render :show, status: :ok, location: @counter }
      else
        format.html { render :edit }
        format.json { render json: @counter.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /counters/1
  # DELETE /counters/1.json
  def destroy
    @counter = @champion.counters.find(params[:id])
    @counter.destroy
    respond_to do |format|
      format.html { redirect_to counters_url, notice: 'Counter was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  #upvote_from user
  #downvote_from user
  def upvote
    @counter.upvote_from current_user
    redirect_to(:back)
  end

  def downvote
    @counter.downvote_from current_user
    redirect_to(:back)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_counter
      @counter = Counter.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def counter_params
      params.require(:counter).permit(:champ_name, :champ_gegner, :strong, :weak)
    end

    def load_parent
      @champion = Champion.find(params[:champion_id])
    end

end
