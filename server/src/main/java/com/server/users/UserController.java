package com.server.users;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository m_userRepository;

    @PostMapping("/createUser")
    public void createUser(@RequestBody User user) {
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);

        m_userRepository.save(user);
    }

    // TODO E - Login

    // TODO E - DELETE User

    // TODO E - Update User

    /*@GetMapping("/{id}")
    public User getUser(@PathVariable String id) {
        return m_userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/")
    public List<User> getAllUsers() {
        return m_userRepository.findAll();
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        User user = m_userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setEmail(updatedUser.getEmail());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        return m_userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        m_userRepository.deleteById(id);
    }*/
}

