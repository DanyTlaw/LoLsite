class CountersController < ApplicationController
  before_action :set_counter, only: [:show, :edit, :update, :destroy]

  # GET /counters
  # GET /counters.json
  def index
    @counters = Counter.all
  end

  def _addCounter
    @counter = Counter.new
  end

  # GET /counters/1
  # GET /counters/1.json
  def show
  end

  # GET /counters/new
  def new
    @counter = Counter.new
  end

  # GET /counters/1/edit
  def edit
    @counter = Counter.find(6)
  end

  # POST /counters
  # POST /counters.json
  def create
    @counter = Counter.new(counter_params)
    # @counter.champ_name =
    @counter.strong = (@counter.strong ? 1 : 0)
    @counter.weak = (@counter.weak ? 0 : 1)

      if @counter.save
        redirect_to(:action => 'index')
      else
        render ('new')
      end
    
  end

  # PATCH/PUT /counters/1
  # PATCH/PUT /counters/1.json
  def update
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
    @counter.destroy
    respond_to do |format|
      format.html { redirect_to counters_url, notice: 'Counter was successfully destroyed.' }
      format.json { head :no_content }
    end
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
end
