require 'fileutils'
require 'csv'
require 'JSON'


in_file = "../../data/scheduled.csv"
out_file = "../../data/scheduled.json"

FIELDS = %w(mnt day carr tail flnm orig dest dep arr elapsed flghts dist carr_nm dairtemp ddewpt dpress dwinddir dwindspd
dprec1 dprec6 oairtemp odewpt opress owinddir owindspd oprec1 oprec6 dcond ocond dname)

open(out_file, 'w') do |f|
  r = []
  CSV.foreach(in_file) do |row|
    o = {}
    for i in 0..FIELDS.length
      o[FIELDS[i]] = row[i]
    end
    r.push o
  end
  f.write JSON.generate(r)
end