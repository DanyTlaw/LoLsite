json.array!(@matchups) do |matchup|
  json.extract! matchup, :id
  json.url matchup_url(matchup, format: :json)
end
