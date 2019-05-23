package com.pl.pik.restful;

import com.pl.pik.model.Car;
import com.pl.pik.model.CarRepository;
import com.pl.pik.model.Schedule;
import com.pl.pik.model.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.List;

@RestController
public class CarsController {

    @Autowired
    CarRepository carRepository;

    @Autowired
    ScheduleRepository scheduleRepository;

    @ResponseBody @GetMapping("/api/cars")
    public String carsController ()  {
        return carRepository.findAll().toString();
    }

    @ResponseBody @GetMapping("/api/freeCars")
    public String carsController (@RequestParam(value="dateFrom") Timestamp dF,
                                  @RequestParam (value="dateTo") Timestamp dT)  {
        List<Car> freeCars = carRepository.findAll();
        for (Schedule schedule:scheduleRepository.findAll()) {
            if (! (schedule.getDateFrom().after(dT) || schedule.getDateTo().before(dF)) ) {
                freeCars.remove(carRepository.findByRegistrationNumber(schedule.getCarId()));
            }
        }
        return freeCars.toString();
    }
}
